//先把所有的工具函数导出的模块在这里导入
//然后再统一导出
//统一管理

import { http } from "./http";
//
import { setToken } from "./token";
import { getToken } from "./token";
import { removeToken } from "./token";
//
import { setDataRole } from "./localData";
import { getDataRole } from "./localData";
import { setDataId } from "./localData";
import { getDataId } from "./localData";
import { getStuId } from "./localData";
import { setStuId } from "./localData";
import { getTeaId } from "./localData";
import { setTeaId } from "./localData";
import { removeDataId } from "./localData";
import { removeDataRole } from "./localData";
import { removeStuId } from "./localData";
import { removeTeaId } from "./localData";
import { setTIme } from "./localData";
import { getTime } from "./localData";
import { removeTime } from "./localData";

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

export {setToken,
        getToken,
        removeToken}


export { http }
 //import { http } from '@/utils'