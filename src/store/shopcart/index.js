import { reqCartList ,reqDeleteCartById,reqUpdateCheckedById} from "@/api"
const state = {
    cartlist:[]
}
const mutations = {
    GETCARTLIST(state,cartlist){
        state.cartlist = cartlist
    }
}
const actions = {
    //获取购物车列表的数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //将购物车的数据删除
    async deleteCartList({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code ==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //切换商品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
    //context:小仓库包含commit getters dispatch state
    //获取购物车全部产品(是一个数组)
    //返回的是一个promise因此可以使用Promise.Al检查里面是不是不是全部处理完成
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item=>{
        let promise = item.isChecked==1?dispatch('deleteCartList',item.skuId):''
        //将每次返回的Promise添加到数组中
        PromiseAll.push(promise)
    })
    //只要全部的p1|p2都成功，返回结果即为成功
    //如果有一个失败，返回都是失败
    return Promise.all(PromiseAll)        
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartlist[0].cartInfoList.forEach(item=>{
            let promise  = dispatch("updateCheckedById",{
                skuId:item.skuId,
                isChecked
            })
            promiseAll.push(promise)
        })
        //最终获得结果
        return Promise.all(promiseAll)
    }
}
const getters = {
    //由于state获取到的数据不是最终想要的因此可以在getters中简化
    cartList(state){
        //可能存在数据还没发送过来，cartlist为空数组导致undefined
        return state.cartlist[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}