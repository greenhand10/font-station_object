//配置路由的地方
import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
// 重写push||replace
// 第一个参数是告诉原来的push方法需要往哪里跳转
// 第二个参数是成功的回调
// 第三个参数是失败后的回调
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve && reject) {
      originPush.call(this,location,resolve,reject);
  } else {
      originPush.call(this,location,()=>{ },()=>{ })
  }
}
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this.replace,resolve,reject)
    } else {
        originReplace.call(this,location,()=>{ },()=>{ })
    }
}
//引入路由组件
import routes  from './routes'
//配置路由
const router = new VueRouter({
    //配置路由
    routes:routes,
    //滚动行为
    scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 }
    }
})

//配置前置路由守卫
router.beforeEach(async(to,from,next) => {
    // to 可以获取要跳转的路由信息
    // from 可以获取从哪个路由来的信息
    // next 放行函数 next()放行  next(path)放行到指定路由
    
    //用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    //用户的信息
    let name = store.state.user.userInfo.name
    
    //用户已经登录
    if(token){
        //用户已经登录了因此不允许再去登录页面
        if(to.path == '/login'){
            next('/home')
        }else{
            //登录的但不是去login
            //如果用户名已有
            if(name){
                next()
            }else{
                //没有用户信息，派发action让仓库存储用户信息的跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    //token失效了 获取不到用户信息
                    //清除token
                    await store.dispatch('loginout');
                    next('/login')
                }
            }
        }
    }else{
        //未登录 不能去交易相关,不能去支付相关[pay|paysuccess] 不能去个人中心
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redict='+toPath)
        }else{
            //剩下的是可放行的路由
            next()
        }
    }
})

//暴露
export default router