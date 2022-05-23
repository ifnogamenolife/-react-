import { Link, Route } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, DatePicker, Select ,Table, Space,Drawer, Row,Input, message} from 'antd'
import 'moment/locale/zh-cn'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import React, { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'
import { PlusOutlined } from '@ant-design/icons';
import {useStore} from '@/store'
import TextArea from 'antd/lib/input/TextArea'


const { Option } = Select
const { RangePicker } = DatePicker

const FillQuestionManage = () => {
 //********************************************************************** */
        //抽屉模块数据
        const [visible, setVisible] = useState(false);
        const [visibleTwo,setVisibleTow] = useState(false);
        const showDrawer = async() => {
          // const data = {
          //   examCode:"",
          //   description:'',
          //   source:'',
          //   paperId:'',
          //   examDate:'',
          //   totalTime:'',
          //   grade:'',
          //   term:'',
          //   major:'',
          //   institute:'',
          //   totalScore:'',
          //   type:'',
          //   tips:''
          // }
          await setVisibleTow(true);
          // await form.current.setFieldsValue(data)
        };

        const onClose = () => {
          setVisible(false);
        };
        const onCloseTwo = () => {
          setVisibleTow(false);
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
          per_page:6
        })

        useEffect(()=>{
          const loadList = async () =>{
            const res = await http.get(`/fillQuestion/${params.page}/${params.per_page}`)
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
        
          const res = await http.delete(`/deleteFillQuestion/${data.questionId}`)
          if (res.code===200) {
            message.success("删除成功")
          }
          setParams({
            ...params,
          })
        }

        //onFinish  搜索函数
        const onFinish=async(values)=>{
          let res 
          if (values.studentId) {
             res = await http.get(`/student/${values.studentId}`)
             if(res.data){
              setAList({
                list:[res.data],
                count:1
              })
            }else{
              setAList({
                list:'',
                count:0
              })
            }
          }else{
             res = await http.get(`/students/${params.page}/${params.per_page}`) 
             setAList({
               list:res.data.records,
               count:res.data.total
             })

          }
          console.log(res)
          
        }//onFinish {}{}{}{}{}

        //onAddFinish 抽屉中submit函数
        
        const onAddFinish = async(values)=>{         
          const res = await  http.put(`/updateFillQuestion?questionId=${values.questionId}&question=${values.question}&answer=${values.answer}`)
          if (res.code==200) {
            message.success('更新成功')
            setVisible(false)
          }
        }//onAddFinish{}{}{}{}

        //addQuextion增加选择题函数
        const addQuestion = async(values)=>{
          console.log(values)
          const res =  await http.post(`/fillQuestion?subject=${values.subject}&question=${values.question}&answer=${values.answer}&score=${values.score}&level=${values.level}`)
          if(res.code===200){
            message.success('增加成功！')
            setVisibleTow(false)
          }
          

        }



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
              title: '试题编号',
              dataIndex: 'questionId',
              width:120,
            },
            {
              title: '课程',
              dataIndex: 'subject',
              width:120
            },
            {
              title: '题干',
              dataIndex: 'question',
              width: 650  
            },
            {
              title: '正确答案',
              dataIndex: 'answer',
              width:300,
            },
            {
              title: '分值',
              dataIndex: 'score',
              width:80
            },
            {
              title: '操作',
              render: data => {
                return (
                  <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />}onClick={()=>studentUpdate(data)} />

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
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} >新增填空题</Button>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
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
        width={550}
        >
        <Form 
        ref={form}
        onFinish={onAddFinish}
        initialValues={{role:2}}
        >
          <Row>课程：<Form.Item name='subject' ><input></input></Form.Item>
               
          </Row>
          <Row>题干：<Form.Item name='question' ><TextArea bordered={false} style={{width:'400px'}}></TextArea></Form.Item>        
          </Row>   
          <Row>
              正确答案:<Form.Item name='answer'><TextArea bordered={false} style={{width:'400px'}}></TextArea></Form.Item>
              <Form.Item name='flag'></Form.Item>
              <Form.Item name='questionId'></Form.Item>
          </Row>
          <Form.Item>
            <button>submit</button>
          </Form.Item>
         
        </Form>
      </Drawer>

      <Drawer
        title="添加填空题部分"
        placement={"top"}
        width={500}
        onClose={onCloseTwo}
        visible={visibleTwo}
        extra={
          <Space>
            <Button onClick={onCloseTwo}>Cancel</Button>
            <Button type="primary" onClick={onCloseTwo}>
              OK
            </Button>
          </Space>
        }
      >
        <Form onFinish={addQuestion}>
          <Row>
            题干：<Form.Item name='question'><TextArea></TextArea></Form.Item>
            难度等级：<Form.Item name='level'>
                                          <Select style={{width:'165px'}}>
                                              <Option value={'1'}>1</Option>
                                              <Option value={'2'}>2</Option>
                                              <Option value={'3'}>3</Option>
                                          </Select>
                     </Form.Item>
            分值：<Form.Item name='score'><Select style={{width:'165px'}}>
                                              <Option value={'1'}>1</Option>
                                              <Option value={'2'}>2</Option>
                                              <Option value={'3'}>3</Option>
                                          </Select></Form.Item>
            考试科目：<Form.Item name='subject'><input></input></Form.Item> 
          </Row>
          <Row>
            正确答案：<Form.Item name='answer'><TextArea></TextArea></Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <button>创建</button>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
  
    </div>
  )
}



export default FillQuestionManage