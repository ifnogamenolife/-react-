import { Link, Route } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, DatePicker, Select ,Table, Space,Drawer, Row,Input,Modal, message} from 'antd'
import 'moment/locale/zh-cn'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'
import { PlusOutlined } from '@ant-design/icons';
import {useStore} from '@/store'


const { Option } = Select
const { RangePicker } = DatePicker

const ExamManage = () => {

//***日期state，使用usestate保存日期 */
const [exam,setDate] = useState({
  date:'',
  subject:'',
  paperId:0
})
  function onChange(date, dateString) {
    setDate({
      date:dateString
    })
  }


//********************************************************************** */
//对话框模块
const [visibleModal, setVisibleModal] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('moren');


  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisibleModal(false);
  };


 //********************************************************************** */
        //抽屉模块数据
        const [visible, setVisible] = useState(false);

        const showDrawer = async() => {
          const data = {
            examCode:"",
            description:'',
            source:'',
            paperId:'',
            examDate:'',
            totalTime:'',
            grade:'',
            term:'',
            major:'',
            institute:'',
            totalScore:'',
            type:'',
            tips:'',
            flag:'0'
          }
          await setVisible(true);
          await form.current.setFieldsValue(data)
        };

        const onClose = () => {
          setVisible(false);
        };

//********************************************************************** */
        //文章列表管理,list就是个对象了
        const [Alist,setAList] = useState({
          list:[],//文章列表
          count : 0//文章数量
        })
        //参数管理,如果想修改page,per_page，调用setParams方法
        const [params,setParams] = useState({
          page:1,
          per_page:4
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
        //删除学生功能（已实现）
        const studentDelete =async(data)=>{
          await http.delete(`/exam/${data.examCode}`)
          setParams({
            ...params,
            page:1
          })
        }

        // //onFinish  搜索函数
        // const onFinish=async(values)=>{
        //   let res 
        //   if (values.studentId) {
        //      res = await http.get(`/student/${values.studentId}`)
        //      if(res.data){
        //       setAList({
        //         list:[res.data],
        //         count:1
        //       })
        //     }else{
        //       setAList({
        //         list:'',
        //         count:0
        //       })
        //     }
        //   }else{
        //      res = await http.get(`/students/${params.page}/${params.per_page}`) 
        //      setAList({
        //        list:res.data.records,
        //        count:res.data.total
        //      })

        //   }
        //   console.log(res)                                          
          
        // }//onFinish {}{}{}{}{}

        //onAddFinish 添加学生函数
        
        const onAddFinish = async(values)=>{
          const res = await http.post(`/exam?description=${values.description}&source=${values.source}&paperId=${values.paperId}&examDate=${exam.date}&totalTime=${values.totalTime}&grade=${values.grade}&term=${values.term}&major=${values.major}&institute=${values.institute}&totalScore=${values.totalScore}&type=${values.type}&tips=${values.tips}`)
          console.log(res)
          setDate({
            subject:values.source,
            paperId:values.paperId
          }) 
          setModalText(values.paperId)
           await setVisibleModal(true);          
        }//onAddFinish{}{}{}{}
/****************************************** */
        const modalOnFinish=async(values)=>{
          const res = await  http.post(`/item?subject=${values.subject}&paperId=${values.paperId}&changeNumber=${values.changeNumber}&fillNumber=${values.fillNumber}&judgeNumber=${values.judgeNumber}`)
          if (res.code===200) {
            setVisibleModal(false);
            setVisible(false);
            message.success('创建成功')            
          }
        }
/****************************************** */


        /****************更新学生函数 */
        const form = useRef(null)
        const studentUpdate =async(data)=>{
          const dataLast={
            ...data,
            flag:'1'
          }
          console.log(dataLast)
          await setVisible(true);
          await form.current.setFieldsValue(dataLast)
          
        }

        //columns
        const columns = [
            {
              title: '考试编号',
              dataIndex: 'examCode',
              width:100,
            },
            {
              title: '考试简介',
              dataIndex: 'description',
              width: 150
            },
            {
              title: '课程名称',
              dataIndex: 'source',
              width: 120  
            },
            {
              title: '试卷编号',
              dataIndex: 'paperId'
            },
            {
              title: '考试日期',
              dataIndex: 'examDate'
            },
            {
              title: '时长',
              dataIndex: 'totalTime'
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
              title: '类型',
              dataIndex: 'type'
            },
            {
              title: '考生须知',
              dataIndex: 'tips'
            },
            {
              title: '删除',
              render: data => {
                return (
                  <Space size="middle">
                    <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}onClick={()=>studentDelete(data)}/>
                  </Space>
                )
              }
            }
          ]
          

  return (
    <div>
        {/* //筛选区 */}
      <Card className='selectScss'
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} >创建新考试</Button>
          </Breadcrumb>
        }
       
      >
        
      </Card>

        {/**考试信息区域 */}
        <Card title={`根据筛选条件共查询到 ${Alist.count} 条结果：`}>
        <Table 
        rowKey="id" 
        columns={columns} 
        dataSource={Alist.list} 
        pagination={{
          pageSize:params.per_page,
          total:Alist.count,
          onChange:pageChange
        }}
        />
      </Card>

        {/**抽屉区域 */}  
        <Drawer 
        title="Basic Message" 
        placement="right" 
        onClose={onClose} visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        className='site-form-in-drawer-wrapper'
        width={550}
        >
        <Form 
        ref={form}
        onFinish={onAddFinish}
        initialValues={{role:2}}
        >
          <Row>
               考试介绍：<Form.Item name='description'><input></input></Form.Item>
               学院：<Form.Item name='institute'><Select style={{ width: '165px' }}><Option value="计算机学院">计算机学院</Option></Select></Form.Item>
          </Row>
          <Row>考试科目：<Form.Item name='source'><input></input></Form.Item>
               年级：<Form.Item name='grade'><Select style={{ width: '165px' }}>
                                                  <Option value="2018">2018</Option>
                                                  <Option value="2019">2019</Option>
                                                  <Option value="2020">2020</Option>      
                                            </Select></Form.Item>
          </Row>
          <Row>
               考试时长：<Form.Item name='totalTime'><input></input></Form.Item>
               专业：<Form.Item name='major'><Select style={{ width: '165px' }}>
                                                  <Option value="计算机科学与技术">计算机科学与技术</Option>
                                                  <Option value="软件工程">软件工程</Option>
                                                  <Option value="网络工程">网络工程</Option>      
                                            </Select>
               </Form.Item>
          </Row>
          <Row>试卷编号：<Form.Item name='paperId'><input placeholder='请输入四位数字'></input></Form.Item>
               学期：<Form.Item name='term'><Select style={{ width: '165px' }}>
                                              <Option value="上">上学期</Option>
                                              <Option value="下">下学期</Option>
                                            </Select></Form.Item>
          </Row>
          <Row>
               考试日期：<Form.Item name='examDate'><DatePicker onChange={onChange} style={{ width: '165px' }}/></Form.Item>
               总分：<Form.Item name='totalScore'><input></input></Form.Item>
          </Row>
          <Row>
            考生须知：<Form.Item name='tips'><input></input></Form.Item>
               类型：<Form.Item name='type'><Select style={{ width: '165px' }}>
                                                    <Option value="期末考试">期末考试</Option>
                                                    <Option value="期中考试">期中考试</Option>
                                                    <Option value="日常练习">日常练习</Option>
                                            </Select></Form.Item>
          </Row>
          <Row>
              
              <Form.Item name='flag'></Form.Item>
          </Row>
          <Form.Item>
            <button>submit</button>
          </Form.Item>
         
        </Form>
      </Drawer>

        {/* 试卷信息生成,对话框区域 */}
        <Modal
          title="Title"
          visible={visibleModal}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
         <Form   
        onFinish={modalOnFinish}

        
        >
          <Row>
               考试科目：<Form.Item name='subject' initialValue={exam.subject}><input ></input></Form.Item>
          </Row>
          <Row>
               试卷编号：<Form.Item name='paperId' initialValue={exam.paperId}><input></input></Form.Item>
          </Row>
          <Row>
               选择题数量：<Form.Item name='changeNumber'><input></input></Form.Item>
          </Row>
          <Row>
               填空题数量：<Form.Item name='fillNumber'><input></input></Form.Item>
          </Row>
          <Row>
               判断题数量：<Form.Item name='judgeNumber'><input></input></Form.Item>
          </Row>
          <Form.Item>
            <button>submit</button>
          </Form.Item>
         
        </Form>
      </Modal>
    </div>
  )
}




export default ExamManage