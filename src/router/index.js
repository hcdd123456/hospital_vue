import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/Index.vue'
import User from '../components/user/User.vue'
import Main from '../components/main/Main.vue'
import Portal from '../components/portal/Portal.vue'
import UserAdd from '../components/user/UserAdd.vue'
import UserUpdate from '../components/user/UserUpdate.vue'
import Department from '../components/department/Department.vue'
import DepartmentAdd from '../components/department/DepartmentAdd.vue'
import DepartmentUpdate from '../components/department/DepartmentUpdate.vue'

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
        },
        {
          path: 'userAdd',
          component:UserAdd
        },
        {
          path: 'userUpdate/:id',
          component: UserUpdate
        },
        {
          path: 'department',
          component: Department
        },
        {
          path:'departmentAdd',
          component:DepartmentAdd
        },
        {
          path:'departmentUpdate/:id',
          component:DepartmentUpdate
        }
      ]
    },

  ]
})

export default router
