import { useNavigate } from "react-router-dom"
import { Card, Button ,Table, Space, message} from 'antd'
import { useEffect, useState } from 'react'
import { getDataId, http } from '@/utils'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from "moment"

const Exam =()=>{

    const navicate = useNavigate()
    const joinExam =()=>{
        console.log('参加考试测试')
        navicate('/examing')
    }

//文章列表管理,list就是个对象了
const [Alist,setAList] = useState({
    list:[],//试卷列表
    count : 0//试卷数量
  })
  //文章参数管理,如果想修改page,per_page，调用setParams方法
  const [params,setParams] = useState({
    page:1,
    per_page:100
  })

  useEffect(()=>{
    const loadList = async () =>{
      const res = await http.get(`/exams/${params.page}/${params.per_page}`)
      const {records,total} = res.data
      setAList({
        list:records,
        count:total
      })
    }
    loadList()
  },[params])
/**************************************************************************** */
  const pageChange = (page)=>{
    setParams({
      ...params,
      page
    })
  }
  /***************************跳转到考试页面****************************** */
  //跳转之前检查专业日期是否匹配，以及是否考过试
  const onclickToExam=async(data)=>{
    const studentId = getDataId()
    const resMajor = await http.get(`/student/${studentId}`)
    const resScore = await http.get(`/score/${studentId}`)
    const resTime = moment().format('YYYY-MM-DD')
    
    if (resTime==data.examDate) {
            //1表示没有参加过考试
            let flag = 1
            resScore.data.map(item=>{
              if (item.examCode==data.examCode) {
                console.log("参加过考试了")
                flag = 0
              }
            })
          if (flag===0) {
            message.error("您已经参加过考试了")
          } else if (data.major==resMajor.data.major) {
            //生成答题卡
            console.log(data.paperId)
            console.log(data.examCode)
            console.log(studentId)

            const res = await http.get(`/createPaper/${data.paperId}/10000/1/${data.examCode}/${studentId}`)
            if (res.code==200) {
              message.success("答题卡生成成功")
            }
            //跳转页面
            navicate(`/examing?id=${data.examCode}`)
          }else{
            message.error("专业不匹配")
          }
      }else if(resTime!=data.examDate){
        message.error("日期不匹配")
      }
   /*******                           ************** */
      
    
  }


            //columns
            const columns = [
                {
                  title: '简介',
                  dataIndex: 'description',
                  width:120,
                },
                {
                  title: '科目',
                  dataIndex: 'source',
                  width: 220
                },
                {
                  title: '日期',
                  dataIndex: 'examDate',
                  width: 220  
                },
                {
                  title: '时长',
                  dataIndex: 'totalTime'
                },
                {
                  title: '年级',
                  dataIndex: 'grade'
                },
                {
                  title: '专业',
                  dataIndex: 'major'
                },
                {
                  title: '总分',
                  dataIndex: 'totalScore'
                },
                {
                  title: '操作',
                  render: data => {
                    return (
                      <Space size="middle">
                        <Button type="primary" 
                        shape="circle" 
                        icon={<EditOutlined
                        onClick={()=>onclickToExam(data)}
                        />} />
                      </Space>
                    )
                  }
                }
              ]

    return (
        <Card title={`根据筛选条件共查询到 ${Alist.count} 条结果：`}>
        <Table 
        rowKey="id" 
        columns={columns} 
        dataSource={Alist.list} 
        pagination={{
          pageSize:params.per_page,
          onChange:pageChange
        }}
        />
      </Card>
    )
}
export default Exam