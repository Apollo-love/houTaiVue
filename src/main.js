import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from '@/store'
import Cookie from 'js-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './api/mock';
import '@/assets/common/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
router.beforeEach((to,from,next)=>{
  const token=Cookie.get('token')
  console.log(token)
  if (!token&&to.name!=='login'){
    next({name:'login'})
  }else if (token&&to.name==='login'){
    next({name:'home'})
  }else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit('addMenu',router)
  }

}).$mount('#app')
