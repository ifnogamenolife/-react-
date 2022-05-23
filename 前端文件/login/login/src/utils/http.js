//封装axios
//实例化  请求拦截器  相应拦截器

import axios from "axios";
import { getToken } from "./token";

const http = axios.create({
    
    baseURL : 'http://localhost:8080',
    timeout : 5000
})

//添加请求拦截器
http.interceptors.request.use(
    (config) =>{
        const token = getToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
    return config
    },
    (error) =>{
        return Promise.reject(error)
    })

//添加响应拦截器

http.interceptors.response.use(
    (response)=>{
        //状态码200-300
        //对相应数据做些什么
        console.log(response.data)
        console.log("位于http.js")
        return response.data
    },
    (error) =>{
        //对错误的相应数据做些什么
        console.log(error+"test---error")
        return Promise.reject(error)
    }
)

export {http}