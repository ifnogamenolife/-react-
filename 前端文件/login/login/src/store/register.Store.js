//login module
import {makeAutoObservable } from 'mobx'
import {http} from '@/utils'



//   http://localhost:8080/


class RegisterStore {
    token =  {}
    constructor(){
        //响应式
        makeAutoObservable(this)    
    }
    getRegisterToken = async({studentId,studentName,grade,major,clazz,institute,tel,email,pwd,cardId,sex,role})=>{
        
        //调用登录接口
        const res = await http.post(`/register?studentId=${studentId}&studentName=${studentName}&grade=${grade}&major=${major}&clazz=${clazz}&institute=${institute}&tel=${tel}&email=${email}&pwd=${pwd}&cardId=${cardId}&sex=${sex}&role=${role}`)
        //存入token        
        this.token = res
        console.log(res+"测试注册返回的数据")
    }
}

export default RegisterStore