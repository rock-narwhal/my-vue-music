import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

//路由重复跳转报错修复
// 原型push对象
const orPush = VueRouter.prototype.push
// 原型replace对象
const orReplace = VueRouter.prototype.replace
//重写push
VueRouter.prototype.push = function (location){
    return orPush.call(this, location).catch(err => err)
}
// 重新replace
VueRouter.prototype.replace = function (location){
    return orReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
