import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet,Link,useLocation,useNavigate} from 'react-router-dom'
import { getDataId, removeDataId, removeDataRole } from '@/utils'
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
    removeDataId('pc-Id')
    removeDataRole('pc-role')
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          {/**得到当前Id */}
          <span className="user-name">管理员{getDataId('pc-Id')}</span>
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
            <Menu.Item icon={<HomeOutlined />} key="/admins">
            <Link to='/admins'>学生管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/admins/teacherManage">
            <Link to='/admins/teacherManage'>教师管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/admins/classManage">
            <Link to='/admins/classManage'>试卷管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Outlet/>
      </Layout>
    </Layout>
  )
}

export default GeekLayout