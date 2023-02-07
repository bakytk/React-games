import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '../views/Login.vue'
import Dash from '../views/Dash.vue'
import Reg from '../views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/register', component: Reg },
    { path: '/login', component: Login },
    { path: '/dashboard', 
      component: Dash, 
		  //beforeEnter: requireAuth 
    },
    { path: '/logout',
        beforeEnter (to, from, next) {
        //auth.logout()
        next('/')}
    }
  ]
})

function requireAuth (to, from, next) {
	
  if (!loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
