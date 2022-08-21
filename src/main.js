import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/index.js'
//引入store
import store from '@/store'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//引入分页组件
import Pagenation from '@/components/Pagenation'
//统一接收接口api文件夹里面的全部暴露
import * as API from '@/api'
//第一个参数：全局组件的名字 第二个参数式：哪一个组件
import VueLazyload from 'vue-lazyload'
Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false
// //测试
// import {reqCategoryList} from '@/api'
// reqCategoryList()
//引入mock
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//引入轮播图全局样式
import Carousel from '@/components/Carousel'
import {MessageBox} from 'element-ui'
//引入表单校验插件
// import "@/plugins/validate"
//注册
Vue.component(Carousel.name,Carousel)
//注册分页全局组件
Vue.component('Pagenation',Pagenation)
//ElementUI注册组件的时候还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$API = API
import abc from '@/assets/1.gif'
Vue.use(VueLazyload,{
  loading:abc
})
new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册store:组件实例的身上会多一个属性$store属性
  store,
  beforeCreate(){
    Vue.prototype.$bus= this
    Vue.prototype.$API = API
  }
}).$mount('#app')
