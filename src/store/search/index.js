//search模块的小仓库
import { reqSearchList } from "@/api"
const state = {
    searchlist:{}
}
const mutations = {
    SEARCHLIST(state,searchlist){
        state.searchlist = searchlist
    }
}
const actions = {
    // data那样写就是如果不是没传数据就默认一个空对象
   async SearchList({commit},data={}){
       const result = await reqSearchList(data)
       if(result.code==200){ 
       commit('SEARCHLIST',result.data)
       }
}
}
//计算属性，在项目当中，为简化数据而生
const getters = {
    goodList(state){
        // 假如没有网络，那么可能忽会是undefined但是undefined如果遍历会报错，因此提前放个空数组
        return state.searchlist.goodsList || []
    },
    trademarkList(state){
        return state.searchlist.trademarkList || []
    },
    attrsList(state){
        return state.searchlist.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}