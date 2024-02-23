export default {
  name: 'archivos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'archivos.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'archivo.create',
      component: () => import('../views/CreateDiario.vue')
  },
  {
      path: 'nuevo-mensual',
      name: 'archivo.mensual.create',
      component: () => import('../views/CreateMensual.vue')
  },
  ]
}