import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet,Link,useLocation,useNavigate} from 'react-router-dom'
import { getDataId } from '@/utils'
import { useStore} from '@/store'


const { Header, Sider } = Layout
const GeekLayout = () => {
  //LoginStore对象
  const {loginStore} = useStore()  
  //当前路径
  const {pathname} = useLocation()

  //退出模块+函数
  const navigate = useNavigate()
  const onConfirm = ()=>{
    //退出登录-删除token
    loginStore.loginOutToken()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          {/**得到当前Id */}
          <span className="user-name">教师{getDataId('pc-Id')}</span>
          <span className="user-logout">
            <Popconfirm 
            onConfirm={onConfirm}
            title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/teacher">
            <Link to='/teacher'>数据概述</Link>
            </Menu.Item>
            <Menu.Item icon={<HomeOutlined />} key="/teacher/studentManage">
            <Link to='/teacher/studentManage'>学生管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/teacher/examManage">
            <Link to='/teacher/examManage'>考试管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/teacher/scoreShow">
            <Link to='/teacher/scoreShow'>成绩查询</Link>
            </Menu.Item>
            <Menu.SubMenu title="题库管理">
            <Menu.Item icon={<DiffOutlined />} key="/teacher/questionManage">             
              <Link to='/teacher/questionManage'>选择题库管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/teacher/fillQuestionManage">             
              <Link to='/teacher/fillQuestionManage'>填空题库管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/teacher/judgeQuestionManage">             
              <Link to='/teacher/judgeQuestionManage'>判断题库管理</Link>
            </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Outlet/>
      </Layout>
    </Layout>
  )
}

export default GeekLayout