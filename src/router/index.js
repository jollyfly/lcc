import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Tab from '@/components/main/Tab'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
        path: '/tab2',
        name: 'Tab',
        component: Tab
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
