import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Main from "@/views/Main";
import Home from "@/views/Home";
import Mall from "@/views/Mall";
import PageOne from "@/views/PageOne";
import PageTwo from "@/views/PageTwo";
import User from "@/views/User";
import store from '@/store'
Vue.config.productionTip = false
Vue.use(VueRouter)
const routes=[
    {
        path:'/',
        name:'Main',
        redirect:'/home',
        component:Main,
        children:[]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router=new VueRouter({
    routes

})

export default router
