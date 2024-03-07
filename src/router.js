import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/routes'
import dashboardRouter from './modules/dashboard/routes'
import { useLoginStore } from './modules/auth/store/login'
import archivosRouter from './modules/archivos/router'
import densidadesRouter from './modules/densidades/routes'
import dictamenesRouter from './modules/dictamenes/routes'
import erroresRouter from './modules/errores/routes'
import empresaRouter from './modules/empresas/routes'
import usuariosRouter from './modules/usuarios/routes'
import perfilesRouter from './modules/perfiles/routes'
import permisosRouter from './modules/permisos/routes'
import clientesRouter from './modules/clientes/routes'
import bitacoraRouter from './modules/bitacora/routes'
import productosRouter from './modules/productos/routes'
import compuestosRouter from './modules/compuestos/routes'
import eventosRouter from './modules/eventos/routes'
import revisionesRouter from './modules/revisiones/routes'
import prestamosRouter from './modules/prestamos/routes'
import almacenesRouter from './modules/almacenes/routes'

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
    path: '/prestamos',
    ...prestamosRouter
  },
  {
    path: '/almacenes',
    ...almacenesRouter
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
  {
    path: '/usuarios',
    ...usuariosRouter
  },
  {
    path: '/perfiles',
    ...perfilesRouter
  },
  {
    path: '/permisos',
    ...permisosRouter
  },
  {
    path: '/empresas',
    ...empresaRouter
  },
  {
    path: '/clientes',
    ...clientesRouter
  },
  {
    path: '/bitacora',
    ...bitacoraRouter
  },
  {
    path: '/productos',
    ...productosRouter
  },
  {
    path: '/compuestos',
    ...compuestosRouter
  },
  {
    path: '/eventos',
    ...eventosRouter
  },
  {
    path: '/revisiones',
    ...revisionesRouter
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