import {reqAddressInfo, reqOrderInfo} from '@/api'
const state = {
    address:[],
    orderInfo:{}
}

const mutations = {
    ADDRESSINFO(state,address){
        state.address = address
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}

const actions = {
    //获取用户地址
    async AddressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code == 200){
            commit('ADDRESSINFO',result.data)
        }
    },

    //获取商品清单
    async orderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('ORDERINFO',result.data)
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