import { reqCategoryList , reqBannerList,reqFloorList} from "@/api"
//home模块的小仓库
const state = {
    //state中的数据默认初始值不能随便写，,服务器返回的是对象，服务器返回的是数组，【根据接口的返回值】
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        // 这里slice可以使数组只取到第16个
        state.categoryList = categoryList.slice(0,16)
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    //通过API里面的接口调用函数，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){
        let result =await reqCategoryList()
        if(result.code===200){
            commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}){
        const result = await reqBannerList()
        if(result.code == 200){
        commit('BANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        const result = await reqFloorList()
        if(result.code==200){
            commit('FLOORLIST',result.data)
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