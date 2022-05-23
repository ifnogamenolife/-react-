//思路：判断token是否存在，如果存在，正常渲染，如果不存在重定向到登录路由

//高阶组件，把一个组件当成另外一个组件的参数传入
//然后通过一定判断，返回新的组件

import {getToken} from  '@/utils'
import {Navigate} from 'react-router-dom'
//children是一个默认参数，只要在组件里写的任何参数都会放到children里面
function AuthComponent ({children}){    
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    }else {
        //如果没有token重定向到login
        return < Navigate to="/login" replace />
    }
}
export {AuthComponent}
// <AuthComponent> <Layout /> </AuthComponent>
//登录： <><layout><>
//非登录：< Navigate to="/login" replace />
//中间的layout就是children