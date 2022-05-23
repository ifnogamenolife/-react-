//把所有的模块做统一处理
//导出一个统一的方法 useStore
import React from "react"
import LoginStore from "./login.Store"
import RegisterStore from "./register.Store"

class RootStore {
    constructor(){
        this.loginStore = new LoginStore()
        this.registerStore = new RegisterStore()
    }
}


//导出useStore

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = ()=> React.useContext(context)

export { useStore}