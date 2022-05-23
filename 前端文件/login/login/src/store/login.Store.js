//login module
import {makeAutoObservable } from 'mobx'
import {getToken, http,setToken,setDataRole,setDataId,setStuId,setTeaId, removeToken} from '@/utils'



//   http://localhost:8080/


class LoginStore {
    token = getToken || {}
    userData = {}
    constructor(){
        //响应式
        makeAutoObservable(this)    
    }
    getToken = async({username,password})=>{  
          
        const res = await http.post(`/login?username=${username}&password=${password}`)
        //存入token
        if(res.code===400){
             
        }else{
            this.token = res
        //存入ls
        if(res.data.role==='0'){
            setDataId(res.data.adminId)
        }else if(res.data.role==='1'){
            setTeaId(res.data.teacherId)
        }else if(res.data.role==='2'){
            setStuId(res.data.studentId)
        } 
        setDataRole(res.data.role)
        setToken(this.token)
        }
        
    }

    loginOutToken = async()=>{
        this.token={}
        removeToken()
    }
}

export default LoginStore