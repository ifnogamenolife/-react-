import { Card,Form,Input,Button } from 'antd'
import './index.scss'
import {useStore} from '@/store'

function Register(){

    const {registerStore} = useStore()

    async function onFinishReigster(values){
      
      await registerStore.getRegisterToken({studentId:values.studentId,
                                            studentName:values.studentName,
                                            grade:values.grade,
                                            major:values.major,
                                            clazz:values.clazz,
                                            institute:values.institute,
                                            tel:values.tel,
                                            email:values.email,
                                            pwd:values.pwd,
                                            cardId:values.cardId,
                                            sex:values.sex,
                                            role:values.role})
      console.log(values.studentId)

    }
    return(
        <div className="login">
      <Card className="register-container">
        {/* 注册表单 */}

        <Form className='Form1'
          validateTrigger={['onBlur','onChange']}
          onFinish = {onFinishReigster}
          >

          <div className='Div1'>
          学号:
          <Form.Item name="studentId">
            <Input size="large" placeholder="请输入学号" />
          </Form.Item>
          姓名
          <Form.Item name="studentName">
            <Input size="large" placeholder="请输入姓名" />
          </Form.Item>
          年级
          <Form.Item name="grade"> 
            <Input size="large" placeholder="请输入年级" />
          </Form.Item>
          专业
          <Form.Item name="major">
            <Input size="large" placeholder="请输入专业" />
          </Form.Item>
          班级
          <Form.Item name="clazz">
            <Input size="large" placeholder="请输入班级" />
          </Form.Item>
          学院
          <Form.Item name="institute"> 
            <Input size="large" placeholder="请输入学院" />
          </Form.Item>
          </div>

          <div className='Div2'>
          电话号码
          <Form.Item name="tel">
            <Input size="large" placeholder="请输入电话号码" />
          </Form.Item>
          电子邮件
          <Form.Item name="email">
            <Input size="large" placeholder="请输入电子邮件" />
          </Form.Item>
          密码
          <Form.Item name="pwd">
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          身份证号
          <Form.Item name="cardId">
            <Input size="large" placeholder="请输入身份证号" />
          </Form.Item>
          性别
          <Form.Item name="sex">
            <Input size="large" placeholder="请输入性别" />
          </Form.Item>
          角色
          <Form.Item name="role">  
            <Input size="large" placeholder="请输入对应角色" />
          </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" size="large" block className='Button1'> 
              登录
          </Button>
        </Form>
        
      </Card>
    </div>
    )
}

export default Register