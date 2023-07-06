import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/router'
import dashboardRouter from './modules/dashboard/router'
import { useLoginStore } from './modules/auth/store/login'
import archivosRouter from './modules/archivos/router'
import densidadesRouter from './modules/densidades/router'
import dictamenesRouter from './modules/dictamenes/router'
import erroresRouter from './modules/errores/router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./views/Landing.vue')
  },
  {
    path: '/auth',
    ...authRouter
  },
  {
    path: '/dashboard',
    ...dashboardRouter
  },
  {
    path: '/archivos',
    ...archivosRouter
  },
  {
    path: '/dictamenes',
    ...dictamenesRouter
  },
  {
    path: '/densidades',
    ...densidadesRouter
  },
  {
    path: '/errores',
    ...erroresRouter
  },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})


router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  if (to.matched.some(r => r.meta.requiresAdministratorAuth)) {
    // esta ruta requiere autenticación, verifica si inició sesión
    // si no, redirigir a la página de inicio de sesión.

    if (!loginStore.user) {
      next({
        name: 'auth.login',
      })
    } else {
      next()
    }
  } else {
    next() // siempre llamar next()!
  }
})

export default router