import {reqGetCode,reGetRole,reqUserLogin,reqUserInfo,LoginOut} from '@/api'
import {setToken ,getToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    LOGINOUT(state){
        state.token = '',
        state.userInfo = {},
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        //获取验证码这个接口，把验证码返回，但是正常情况下，后台把验证码发到用户的手机上
        let result = await reqGetCode(phone)
        if(result.code ==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))    
        }
    },
    //注册用户
    async getRole({commit},data){
        let result = await reGetRole(data)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code == 200){
            commit("USERLOGIN",result.data.token)
            //持续化存储token
            setToken(result.data.token)
            return "ok"   
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('没有获取到用户信息'))
        }
    },

    //退出
    async loginout({commit}){
        let result = await LoginOut()
        if(result.code == 200){
            commit("LOGINOUT")
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}