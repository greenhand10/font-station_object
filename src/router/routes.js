import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login/index.vue'
import Search from '@/pages/Search/index.vue'
import Register from '@/pages/Register/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
//对外暴露路由信息
export default [
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        children:[
            {   path:'myorder',
                component:MyOrder,
                meta:{show:true}   
            }
            ,
            {   
                path:'grouporder',
                component:GroupOrder,
                meta:{show:true}
            }
            ,
            // 重定向当访问center之后自动定向到myorder
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    }
    ,
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    }
    ,
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    }
    ,
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            //去交易页面必须是从购物车来
            if(from.path=='/ShopCart'){
                next()
            }else{
                // 就是从哪里来回哪里去
                // 如果浏览器URL改变了,那么URL地址会重置到from路由对应的地址
                next(false)
            }
        }    
    }
    ,
    {
        path:'/ShopCart',
        component:ShopCart,
        meta:{show:true}
    }
    ,
    {
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true},
        name:"addcartsuccess"
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {   path:"/home",
        component:Home,
        meta:{show:true}
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    //path在后面加一个?是为了在传params参数的时候，将路径设置为可传可不传
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:"search",
        //路由组件能不能传递props数据
        //布尔值写法:params(只能传递params参数)
        // props:true,
        //对象写法:额外的路由组件传递一些props
        // props:{a:1,b:2}
        //函数写法:可以params参数，query参数，通过props传递给路由组件
        // props:($route)=>{
        //     return {
        //         keywords:$route.params.keywords,
        //         k:$route.query.k
        //     }
        // }
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    //设置重定向,在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:"/",
        redirect:"/home"
    }
    ]