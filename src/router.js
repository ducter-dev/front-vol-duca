import { createRouter, createWebHistory } from 'vue-router'
import Login from './modules/auth/views/Login.vue'

import RecuperarPassword from './modules/auth/views/RecuperarPassword.vue'

const routes = [
    { 
        path: '/', 
        component: Login,
        name: 'login'
    },
    {
      path: '/password/recuperar',
      component: RecuperarPassword,
      name: 'recovery'
    },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router