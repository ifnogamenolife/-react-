const key = 'pc-role'
const key2 = 'pc-Id'
const key3 = 'pc-time'
//角色
const setDataRole =(token)=>{
   return window.localStorage.setItem(key,token)
}
const getDataRole =()=>{
    return window.localStorage.getItem(key)
}
const removeDataRole =()=>{
    return window.localStorage.removeItem(key)
}


//管理员
const setDataId =(token)=>{
   return window.localStorage.setItem(key2,token)
}
const getDataId =()=>{
    return window.localStorage.getItem(key2)
}
const removeDataId =()=>{
    return window.localStorage.removeItem(key2)
}

//学生
const setStuId =(token)=>{
    return window.localStorage.setItem(key2,token)
 }
 const getStuId =()=>{
     return window.localStorage.getItem(key2)
 }
 const removeStuId =()=>{
    return window.localStorage.removeItem(key2)
}

//教师
 const setTeaId =(token)=>{
    return window.localStorage.setItem(key2,token)
 }
 const getTeaId =()=>{
     return window.localStorage.getItem(key2)
 }
 const removeTeaId =()=>{
    return window.localStorage.removeItem(key2)
}
//时间，用来做计时器
const setTIme =(token)=>{
    return window.localStorage.setItem(key3,token)
}
const getTime =()=>{
    return  window.localStorage.getItem(key3)
}
const removeTime =()=>{
    return window.localStorage.removeItem(key3)
}

export {setDataRole,
        setDataId,
        getDataRole,
        getDataId,
        setStuId,
        getStuId,
        setTeaId,
        getTeaId,
        removeDataId,
        removeDataRole,
        removeStuId,
        removeTeaId,
        setTIme,
        getTime,
        removeTime}