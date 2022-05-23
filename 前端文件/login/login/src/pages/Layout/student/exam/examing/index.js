import { getDataId, getTime, http, setTIme } from "@/utils"
import { Button, Card ,Statistic, Col, message, Row, Table ,Tag,Space,Form,Drawer,Radio} from "antd"
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import Message from "../../message"
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import TextArea from "antd/lib/input/TextArea"

function Examing(){
    //通过url获取examCode ==id,以及用户id
    const [params] = useSearchParams({ })
    const id = params.get('id')
    const studentId = getDataId()
    //根据获取到的id查询考试信息
    const [time,setTime] = useState({
        timeResult:1,
        description:'',
        block:'',
        source:'',

    })  

    //********************************************************************** */
        //抽屉模块数据
        const [multiVisible, setMultiVisible] = useState(false);
        const [judgeVisible, setJudgetVisible] = useState(false);
        const [fillVisible, setFillVisible] = useState(false);
        //关闭抽屉函数
        const multiOnClose = () => {setMultiVisible(false);};
        const judgeOnClose = () => {setJudgetVisible(false);};
        const fillOnClose = () => {setFillVisible(false);};

        //学生的答案提交函数
        const onAddFinish=async(values)=>{
          console.log(values)
            //获取当前答卷学生的id
            const studentId = getDataId('pc-Id')
            const studentName = await (await http.get(`student/${studentId}`)).data.studentName
            //判断答案正误
            let flag = 0
            if (values.studentAnswer==values.answer) {
              flag = 1
              console.log("对哦")
            }
            //调用接口
            const res = await http.put(`/studentPaper?questionId=${values.questionId}&questionType=${values.type}&studentId=${studentId}&studentName=${studentName}&studentAnswer=${values.studentAnswer}&answer=${values.answer}&flag=${flag}&exist=1&examCode=${id}`)
            if (res.code==200) {
              message.success('答题成功')
              setMultiVisible(false)
              setJudgetVisible(false)
              setFillVisible(false)
            }
          }
        //表单数据回填
        const form = useRef(null)
        //按钮答题(选择题数据回填)
        const multiDrawer =async(data)=>{
            await setMultiVisible(true); 
            setTimeout(() => {
                form.current.setFieldsValue(data);
              }, 100);
              
        }
        //判断题（（判断题数据回填）
        const judgeDrawer =async(data)=>{
            await setJudgetVisible(true); 
            setTimeout(() => {
                form.current.setFieldsValue(data);
              }, 100);
              
        }
        //填空题（填空题数据回填）
        const fillDrawer =async(data)=>{
            await setFillVisible(true); 
            setTimeout(() => {
                form.current.setFieldsValue(data);
              }, 100);
              
        }

//********************************************************************** */


    //处理获得的试题信息
    const [question,setQuestion] = useState({
        multiList:[],
        judgeList:[],
        fillList:[],
        paperMessage:[]
    })

    useEffect(()=>{
        const messageGet =async()=>{
            const res = await http.get(`/exam/${id}`)
            //处理试卷信息
            setTime({
                timeResult:res.data.totalTime,
                description:res.data.description,
                block:'&nbsp',
                source:res.data.source
            })
            const multi = await http.get(`/paper/multi/${res.data.paperId}`)
            const judge = await http.get(`/paper/judge/${res.data.paperId}`)
            const fill = await http.get(`/paper/fill/${res.data.paperId}`)
            const paper = await http.get(`paperMessage/${id}/${studentId}`)
                setQuestion({
                    multiList:multi.data,
                    judgeList:judge.data,
                    fillList:fill.data,
                    paperMessage:paper.data
                })           
       } 

       messageGet()
    },[])
    
    // const showQuestion =async()=>{
    //     //处理试题信息:选择题
        
            
    //     console.log(question.multiList)
    //     console.log(question.fillList)
    //     console.log(question.judgeList)
    //     //处理试题信息:判断题
        
    //     setQuestion({
            
    //     })
    //     //处理试题信息:填空题
        
    //     setQuestion({
            
    //     })    
    // }



    //计时器工作
    const { Countdown } = Statistic;
    const [deadline,setDeadLine] = useState(1)
    useEffect(()=>{
      const timeOver=async()=>{
        const res = await http.get(`/exam/${id}`) 
        const timeFromLocal = getTime()
        let timeLast
        if (timeFromLocal==null) {
          timeLast =res.data.totalTime 
        }else if (timeFromLocal<res.data.totalTime*60*1000) {
          timeLast = timeFromLocal/60/1000
        }
        
        const deadline = Date.now() + timeLast*60*1000; // Moment is also OK
        setDeadLine(deadline)
        
        //倒计时结束触发函数
      }
      timeOver()
    },[])

    const timeChange=(val)=>{
      const timeFromLocal = getTime()
      if (timeFromLocal==null) {
        setTIme(val)
      }
      if (val>timeFromLocal) {    
      }else{
        setTIme(val)
      }
      
    }

    const timeOnFinish=()=>{
      message.success("倒计时结束")
      navicate(`/scoreAfterExam?id=${id}`) 
  }


//********************************************************************** */
//交卷函数，点击确定后跳转到分数页面，把考试id传过去
const navicate = useNavigate()
const finishExam=()=>{

  navicate(`/scoreAfterExam?id=${id}`)  
}
//********************************************************************** */





    //columns
    //选择题格式
    const multiColumns = [
        {
          title: '问题',
          dataIndex: 'question',
          width:1000,
        },
        {
            title: '操作',
            render: (data) => {   
              let tags = 0
              question.paperMessage.map(item=>{
                if (data.questionId==item.questionId&&item.questionType==1&&item.studentAnswer==0) {
                  tags = 1
                }
              })
              console.log(tags)

              if (tags===1) {
                return (
                  <Space size="middle">
                    <Tag color='volcano' >
                      未作答
                    </Tag>
                  </Space>
                )
              }else{
                return(
                    <Space size="middle">
                      <Tag color='geekblue' >
                        已作答
                      </Tag>
                    </Space>
                  )               
              }


            }
          },
          {
            title: '操作',
            render: data => {
              return (
                <Space size="middle">
                  <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>multiDrawer(data)}/>
                </Space>
              )
            }
          }
        
      ]
      //判断题格式
      const judgeColumns = [
        {
          title: '问题',
          dataIndex: 'question',
          width:1000,
        },
        {
            title: '操作',
            render: data => {
              let tags = 0
              question.paperMessage.map(item=>{
                if (data.questionId==item.questionId&&item.questionType==3&&item.studentAnswer==0) {
                  tags = 1
                }
              })
              console.log(tags)

              if (tags===1) {
                return (
                  <Space size="middle">
                    <Tag color='volcano' >
                      未作答
                    </Tag>
                  </Space>
                )
              }else{
                return(
                    <Space size="middle">
                      <Tag color='geekblue' >
                        已作答
                      </Tag>
                    </Space>
                  )               
              }
            }
          },
          {
            title: '操作',
            render: data => {
              return (
                <Space size="middle">
                  <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>judgeDrawer(data)}/>
                </Space>
              )
            }
          }
        
      ]
      //填空题格式
      const fillColumns = [
        {
          title: '问题',
          dataIndex: 'question',
          width:1000,
        },
        {
            title: '操作',
            render: data => {
              let tags = 0
              question.paperMessage.map(item=>{
                if (data.questionId==item.questionId&&item.questionType==2&&item.studentAnswer==0) {
                  tags = 1
                }
              })
              console.log(tags)

              if (tags===1) {
                return (
                  <Space size="middle">
                    <Tag color='volcano' >
                      未作答
                    </Tag>
                  </Space>
                )
              }else{
                return(
                    <Space size="middle">
                      <Tag color='geekblue' >
                        已作答
                      </Tag>
                    </Space>
                  )               
              }
            }
          },
          {
            title: '操作',
            render: data => {
              return (
                <Space size="middle">
                  <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>fillDrawer(data)}/>
                </Space>
              )
            }
          }
        
      ]


    return (
        <div>
            <Card
            className="examCard"
            title={
                <div>
                    <Row>
                        {time.description}
                    </Row>
                    <Row>
                        {time.source}
                    </Row>
                </div>
            } 
            extra={
                <div>
                        <Col span={20}>
                        <Countdown title="考试时长"
                                   value={deadline} 
                                   format="HH:mm:ss" 
                                   onFinish={timeOnFinish}
                                   onChange={timeChange}
                                   valueStyle={{color:'red'}}
                        />
                        </Col>
                    
                    <Button onClick={finishExam} style={{color:'white',background:'red'}}>交卷</Button>
                </div>
            }>
                {/* 单选题card */}
                <Card
                    className="innerCard"
                    style={{ marginTop: 16 ,width:1270}}
                    type="inner"
                    title="单选题"
                    extra={<a href="#">More</a>}
                >
                    <div>
                        <Table columns={multiColumns}  dataSource={question.multiList}/>
                    </div>
                </Card>
                {/* 判断题card */}
                <Card
                    className="innerCard"
                    style={{ marginTop: 16 ,width:1270}}
                    type="inner"
                    title="判断题"
                    extra={<a href="#">More</a>}
                >
                    <div>
                        <Table columns={judgeColumns}  dataSource={question.judgeList}/>
                    </div>
                </Card>
                {/* 填空题card */}
                <Card
                    className="innerCard"
                    style={{ marginTop: 16 ,width:1270}}
                    type="inner"
                    title="填空题"
                    extra={<a href="#">More</a>}
                >
                   <div>
                        <Table columns={fillColumns}  dataSource={question.fillList}/>
                    </div>
                </Card>

        {/**选择题抽屉区域 */}  
        <Drawer 
        title="选择题" 
        placement="right" 
        onClose={multiOnClose} visible={multiVisible}
        bodyStyle={{ paddingBottom: 80 }}
        className='site-form-in-drawer-wrapper'
        width={540}
        >
        <Form 
        ref={form}
        onFinish={onAddFinish}
        initialValues={{type:1}}
        >
          <Row>题干：<Form.Item name='question' ><TextArea bordered={false} style={{width:'400px',height:'100px'}}></TextArea></Form.Item>         
          </Row>
          <Row>A:<Form.Item name='answerA' ><TextArea bordered={false} style={{width:'400px'}}></TextArea></Form.Item>   
          </Row>
          <Row>B:<Form.Item name='answerB' ><TextArea bordered={false} style={{width:'400px'}}></TextArea></Form.Item>      
          </Row>
          <Row>C:<Form.Item name='answerC' ><TextArea bordered={false} style={{width:'400px'}}></TextArea></Form.Item>
          </Row>
          <Row>D:<Form.Item name='answerD' ><TextArea bordered={false} style={{width:'400px'}}></TextArea></Form.Item>
          </Row>
         答案：<Form.Item name='studentAnswer'>
            <Radio.Group >
                <Radio value={'A'}>A</Radio>
                <Radio value={'B'}>B</Radio>
                <Radio value={'C'}>C</Radio>
                <Radio value={'D'}>D</Radio>
            </Radio.Group>
            </Form.Item>
           
          
          <Form.Item>
            <button >submit</button>
          </Form.Item>
          <Form.Item name='questionId'></Form.Item>
          <Form.Item name='answer'></Form.Item>
          <Form.Item name='score'></Form.Item>
          <Form.Item name='type'></Form.Item>
         
        </Form>
      </Drawer>

        {/**判断题抽屉区域 */}  
        <Drawer 
        title="判断题" 
        placement="right" 
        onClose={judgeOnClose} visible={judgeVisible}
        bodyStyle={{ paddingBottom: 80 }}
        className='site-form-in-drawer-wrapper'
        width={520}
        >
        <Form 
        ref={form}
        onFinish={onAddFinish}
        initialValues={{type:3}}
        >
          <Row>题干：<Form.Item name='question'><TextArea bordered={false} style={{width:'400px',height:'100px'}}></TextArea></Form.Item>         
          </Row>
          <Row>答案：<Form.Item name='studentAnswer'>
                        <Radio.Group >
                            <Radio value={'T'}>T</Radio>
                            <Radio value={'F'}>F</Radio>
                           
                        </Radio.Group>
                    </Form.Item>   
          </Row>
          
          <Form.Item>
            <button>submit</button>
          </Form.Item>
          <Form.Item name='questionId'></Form.Item>
          <Form.Item name='answer'></Form.Item>
          <Form.Item name='score'></Form.Item>
          <Form.Item name='type'></Form.Item>
        </Form>
      </Drawer>

        {/**填空题题抽屉区域 */}  
        <Drawer 
            title="填空题" 
            placement="right" 
            onClose={fillOnClose} visible={fillVisible}
            bodyStyle={{ paddingBottom: 80 }}
            className='site-form-in-drawer-wrapper'
            width={520}
            >
            <Form 
            ref={form}
            onFinish={onAddFinish}
            initialValues={{type:2}}
            >
            <Row>题干：<Form.Item name='question'><TextArea bordered={false} style={{width:'400px',height:'100px'}}></TextArea></Form.Item>         
            </Row>
            <Row>
                在这里答题：<Form.Item name='studentAnswer'><input></input></Form.Item>
            </Row>
            <Form.Item>
                <button>submit</button>
            </Form.Item>
            <Form.Item name='questionId'></Form.Item>
            <Form.Item name='answer'></Form.Item>
            <Form.Item name='score'></Form.Item>
            <Form.Item name='type'></Form.Item>
            </Form>
      </Drawer>

            </Card>
        </div>
    )
}

export default Examing