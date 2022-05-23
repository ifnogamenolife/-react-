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

const TeacherManage = () => {
 //********************************************************************** */
        //抽屉模块数据
        const [visible, setVisible] = useState(false);
        const showDrawer = async() => {
          const data = {cardId: "",
          email: "",
          institute: "",
          pwd: "",
          role: "1",
          sex: "",
          teacherId:"",
          teacherName: "",
          tel: "",
          type: "",
          flag:'0'}
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
            const res = await http.get(`/teachers/${params.page}/${params.per_page}`)
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
          const res = await http.delete(`/teacher/${data.teacherId}`)
          if (res.code==200) {
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
             res = await http.get(`/teacher/${values.studentId}`)
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
             res = await http.get(`/teachers/${params.page}/${params.per_page}`) 
             setAList({
               list:res.data.records,
               count:res.data.total
             })

          }
          console.log(res)
          
        }//onFinish {}{}{}{}{}
        //onAddFinish 添加教师函数
        const onAddFinish = async(values)=>{
          if (values.flag==='0') {
            const res = await http.post(`/teacher?teacherId=${values.teacherId}&teacherName=${values.teacherName}&institute=${values.institute}&sex=${values.sex}&tel=${values.tel}&email=${values.email}&pwd=${values.pwd}&cardId=${values.cardId}&type=${values.type}&role=1`)
            if (res.code==200) {
              message.success("增加成功")
              setVisible(false)
            }
          }else if(values.flag==='1'){
            const ress =await http.put(`/teacher?teacherId=${values.teacherId}&teacherName=${values.teacherName}&institute=${values.institute}&sex=${values.sex}&tel=${values.tel}&email=${values.email}&pwd=${values.pwd}&cardId=${values.cardId}&type=${values.type}&role=1`)
            if (ress.code==200) {
              message.success("更新成功")
              setVisible(false)
            }
          }
        }//onAddFinish{}{}{}{}

        /** */
        /****************更新学生函数 */
        const form = useRef(null)
        const teacherUpdate =async(data)=>{
          const dataLast ={
            ...data,
            flag:'1'
          }
          await setVisible(true);
          await form.current.setFieldsValue(dataLast)
          
        }




        //columns
        const columns = [
            {
              title: '账号',
              dataIndex: 'teacherId',
              width:120,
            },
            {
              title: '名字',
              dataIndex: 'teacherName',
              width: 220
            },
            {
              title: '学院',
              dataIndex: 'institute',
              width: 220  
            },
            {
              title: '职称',
              dataIndex: 'type'
            },
            {
              title: '性别',
              dataIndex: 'sex'
            },
            {
              title: '电话',
              dataIndex: 'tel'
            },
            {
              title: '操作',
              render: data => {
                return (
                  <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>teacherUpdate(data)}/>
                    <Button
                      type="primary"
                      danger
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={()=>studentDelete(data)}
                    />
                  </Space>
                )
              }
            }
          ]
  //表单数据验证
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
    
  };          


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
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} >add teacher</Button>
          </Breadcrumb>
        }
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
        title="Basic Drawer" 
        placement="right" 
        onClose={onClose} visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        className='site-form-in-drawer-wrapper'
        width={520}
        >
        <Form
        validateTrigger={['onBlur','onChange']} 
        ref={form} 
        initialValues={{role:1}}
        onFinish={onAddFinish}
        validateMessages={validateMessages}
        >
          <Row>学号：<Form.Item name='teacherId' 
               rules={[
                        {
                            required :true,
                             message : '输入八位学号',
                        },
                        
                    ]}   
                    >
                      <input></input>
                    </Form.Item>
               电话号码：<Form.Item name='tel' rules={[
                            {
                                required :true,
                                 message : '输入电话号码',
                            }, 
                        ]}   >
                          <input></input>
                        </Form.Item>
          </Row>
          <Row><Form.Item name='teacherName' label="Name" rules={[{ required: true }]}><input></input></Form.Item>
          <Form.Item name='email' label="Email" rules={[{ type: 'email' }]}><input></input></Form.Item>
          </Row>
          <Row>
               密码    ：<Form.Item name='pwd'><input></input></Form.Item>
               身份证号：<Form.Item name='cardId'><input></input></Form.Item>
          </Row>
          <Row>职称：<Form.Item name='type'><Select style={{width:'165px'}}>
                                                  <Option value={'教授'}>教授</Option>
                                                  <Option value={'副教授'}>副教授</Option>
                                                  <Option value={'讲师'}>讲师</Option>
                                               </Select></Form.Item>
               性别：<Form.Item name='sex'
                            rules={[
                              {
                                  required :true,
                                   message : '请选择性别',
                              },                             
                          ]}
                         ><Select style={{width:'165px'}}>
                                                  <Option value={'男'}>男</Option>
                                                  <Option value={'女'}>女</Option>
                                               </Select></Form.Item>
          </Row>
          <Row>学院：<Form.Item name='institute'><input></input></Form.Item>
                         <Form.Item name='role'></Form.Item>
                         <Form.Item name='flag'></Form.Item>
          </Row>
          <Form.Item>
            <button>submit</button>
          </Form.Item>
         
        </Form>
      </Drawer>
        


    </div>
  )
}

export default TeacherManage