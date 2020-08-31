import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/Index.vue'
import User from '../components/user/User.vue'
import Main from '../components/main/Main.vue'
import Portal from '../components/portal/Portal.vue'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/main',
      component: Main,
      //配置子路由
      children: [
        {
          path: '/',
          component: Portal
        },
        {
          path: 'user',
          component: User
        }
      ]
    },

  ]
})

export default router
