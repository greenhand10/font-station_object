import { reqGoodList,reqAddOrUpdateShopCart } from "@/api"
//封装一个游客身份uuid 生成一个随机字符串（不能再变）
import {getUUID} from '@/utils/uuid_token.js'
const state = {
    goodlist:{},
    //游客临时身份
    //在另外文件里面写并暴露getUUID的函数返回一个uuid
    uuid_token:getUUID()
}
const mutations = {
    GETGOODLIST(state,goodlist){
        state.goodlist = goodlist
    }
}
const actions = {
    async getGoodList({commit},skuId){
    let result = await reqGoodList(skuId)
    if(result.code == 200){
        commit('GETGOODLIST',result.data)
    }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code == 200){
        return 'ok'
    }else{
        Promise.reject(new Error('fail'))
    }
    },
}
const getters = {
    categoryView(state){
        // 在还未请求之前对象是空的那么空对象的.categoryView就是undefined
        //这个是undefined如果点属性就会报错
        return state.goodlist.categoryView || {}
    },
    skuInfo(state){
        return state.goodlist.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodlist.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}