import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import RecuperarPassword from './views/RecuperarPassword.vue'

const routes = [
    { 
        path: '/', 
        component: Login 
    },
    {
      path: '/password/recuperar',
      component: RecuperarPassword,
    },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router