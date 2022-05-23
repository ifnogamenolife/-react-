import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, DatePicker, Select ,Table, Space,Drawer, Row,Input, message} from 'antd'
import 'moment/locale/zh-cn'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import React, { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'
import { PlusOutlined } from '@ant-design/icons';



const { Option } = Select
const { RangePicker } = DatePicker

const ScoerShow = () => {
 //********************************************************************** */
        //抽屉模块数据
        const [visible, setVisible] = useState(false);

        const showDrawer = async() => {
          const data = {cardId: "",
          clazz: "",
          email: "",
          grade: "",
          institute: "",
          major: "",
          pwd: "",
          role: "2",
          sex: "",
          studentId: "",
          studentName: "",
          tel: ""}
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
          per_page:5
        })

        useEffect(()=>{
          const loadList = async () =>{
            const res = await http.get(`/score/${params.page}/${params.per_page}`)
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
        //删除成绩功能（已实现）
        const studentDelete =async(data)=>{
          const res = await http.delete(`/score/${data.examCode}/${data.studentId}`)
          if (res.code===200) {
            message.success('删除成功')
            setParams({
              ...params,
              page:1
            })
          }
          
        }

        //onFinish  搜索函数
        const onFinish=async(values)=>{
          let res 
          if (values.studentId) {
             res = await http.get(`/score/${params.page}/${params.per_page}/${values.studentId}`)
             if(res.data){
              setAList({
                list:res.data.records,
                count:res.data.total
              })
            }else{
              setAList({
                list:'',
                count:0
              })
            }
          }else{
             res = await http.get(`/score/${params.page}/${params.per_page}`) 
             setAList({
               list:res.data.records,
               count:res.data.total
             })

          }
          console.log(res)
          
        }//onFinish {}{}{}{}{}

        //onAddFinish 添加学生函数
        
        const onAddFinish = async(values)=>{
           
        }//onAddFinish{}{}{}{}

        /****************更新学生函数 */
        const form = useRef(null)
        const studentUpdate =async(data)=>{
          await setVisible(true);
          await form.current.setFieldsValue(data)
          
        }

        //columns
        const columns = [
            {
              title: '学号',
              dataIndex: 'studentId',
              width:120,
            },
            {
              title: '名字',
              dataIndex: 'studentName',
              width: 220
            },
            {
              title: '考试编号',
              dataIndex: 'examCode',
              width: 220  
            },
            {
              title: '课程名称',
              dataIndex: 'subject'
            },
            {
              title: '分数',
              dataIndex: 'etScore'
            },
            {
              title: '考试日期',
              dataIndex: 'answerDate'
            },
            
            {
              title: '操作',
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
        style={{ marginBottom: 20 }}
      >
        <Form 
        validateTrigger={['onBlur','onChange']}
        onFinish={onFinish}    
        >
          <Row>
            输入学号：
            <Form.Item name="studentId">
              <Input></Input>
            </Form.Item>
          </Row>

          <Form.Item>
            <Button 
            type="primary" 
            htmlType="submit" 
            style={{ marginLeft: 80 }}
            >
              搜索
            </Button>
          </Form.Item>
        </Form>
      </Card>

        {/**文章区域 */}
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
        width={520}
        >
        <Form 
        ref={form}
        onFinish={onAddFinish}
        initialValues={{role:2}}
        >
          <Row>学号：<Form.Item name='studentId'><input></input></Form.Item>
               电话号码：<Form.Item name='tel'><input></input></Form.Item>
          </Row>
          <Row>姓名：<Form.Item name='studentName'><input></input></Form.Item>
               电子邮件：<Form.Item name='email'><input></input></Form.Item>
          </Row>
          <Row>年级：<Form.Item name='grade'><input></input></Form.Item>
               密码    ：<Form.Item name='pwd'><input></input></Form.Item>
          </Row>
          <Row>专业：<Form.Item name='major'><input></input></Form.Item>
               身份证号：<Form.Item name='cardId'><input></input></Form.Item>
          </Row>
          <Row>班级：<Form.Item name='clazz'><input></input></Form.Item>
               性别    ：<Form.Item name='sex'><input></input></Form.Item>
          </Row>
          <Row>学院：<Form.Item name='institute'><input></input></Form.Item>
               角色    ：<Form.Item name='role'><input></input></Form.Item>
          </Row>
          <Form.Item>
            <button>submit</button>
          </Form.Item>
         
        </Form>
      </Drawer>
  
    </div>
  )
}


export default ScoerShow