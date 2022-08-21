//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";
//三级联动接口
//api/product/getBaseCategoryList  get  无参数
//发送请求:axios发送请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqBannerList = ()=>mockRequests({url:'/banner',method:'get'})
export const reqFloorList = ()=>mockRequests({url:'/floor',method:'get'})
export const reqSearchList = (data)=>requests({url:'/list',method:'post',data:data})
export const reqGoodList = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})
// 添加到购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
//获取购物车列表数据接口
export const reqCartList =()=>requests({
    url:'/cart/cartList',
    method:'get'
})
//删除购物车
export const reqDeleteCartById =(skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})
//切换商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

//获取注册验证码的
export const reqGetCode = (phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

//注册用户
export const reGetRole = (data)=>requests({
    url:`/user/passport/register`,
    method:'post',
    data
})

//登录
export const reqUserLogin = (data)=>requests({
    url:`/user/passport/login`,
    method:'post',
    data
})

//获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = ()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get',
})

//通知服务器退出用户登录
export const LoginOut = ()=>requests({
    url:'/user/passport/logout',
    method:'get'
})

//获取用户地址信息
//url:/api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = ()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//获取商品清单
export const reqOrderInfo = ()=>requests({
    url:'/order/auth/trade',
    method:'get'
})

//提交订单
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})

//获取支付信息
export const reqPayInfo  = (orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//获取支付订单状态
export const reqPayStatus = (orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/{orderId}`,
    method:'get'
})

//获取订单列表
export const reqMyOrderInfo = (page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})