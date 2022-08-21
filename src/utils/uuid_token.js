import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串，且每次实行不能发生变化，游客身份持续存储
export const getUUID = ()=>{
    //先从本地存储获取uuid（看一下本都存储里面是否有）‘
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有就新生成
    if(!uuid_token){
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    //同时记得写返回值
    return uuid_token
}