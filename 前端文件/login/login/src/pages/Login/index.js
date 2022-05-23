import React from "react"
import { Card, Checkbox, Form, Input ,Button,message} from 'antd'
import logo from '@/assets/logo.png'
//导入scss样式文件
import './index.scss'
import { useStore } from '@/store'
import { useNavigate,Link } from 'react-router-dom'
import { getDataRole } from "@/utils"


function Login (){

    const { loginStore } = useStore()
    const navicate = useNavigate()
    async function onFinish(values){
        //values放置的是所有表单项中用户输入的数据
        console.log(values)
        //todo:登录
         const res = await loginStore.getToken({username: values.username,password : values.password})
         const role = await getDataRole()
         console.log(role)
         if(role===null){
             message.error('密码错误')
         }else {
            if(role==='0'){
                //跳转首页
             navicate('/admins',{replace : true})
             }else if(role==='1'){
                navicate('/teacher',{replace : true})    
             }else if(role==='2'){
                navicate('/student',{replace : true})
             } 
             //提示用户
             message.success('登录成功')
         }
        
    }


    
    return(    
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/**登录模块 */}
                 <Form 
                 validateTrigger={['onBlur','onChange']}
                 initialValues={{
                     remember : true,
                     username : '9527',
                     password:'123456'}}
                     onFinish = {onFinish}
                 >
                     <Form.Item 
                        name="username"
                        rules={[
                            {
                                required :true,
                                 message : '输入输入输入输入',
                            },
                            {
                                // pattern: /^1[3-9]\d{9}$/,
                                message: '输入正确的学号',
                                validateTrigger : 'onBlur'

                            }
                        ]}
                        
                     > 
                         <Input size="large" placeholder="输入用户名"/>
                     </Form.Item>
                     <Form.Item
                        name="password"
                        rules={[
                            {
                                required :true,
                                 message : '输入输入输入输入mima',
                            },
                            {
                                len:6,
                                message: "输入六位密码",
                                validateTrigger : 'onBlur'
                            }
                        ]}
                        
                     >
                         <Input size="large" placeholder="亲输入密码"/>
                     </Form.Item>
                     <Form.Item>
                     <Checkbox className="login-checkbox-label">
                        我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                                登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                    <Link to="/register">没有账号</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login