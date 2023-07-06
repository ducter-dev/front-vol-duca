export default {
  name: 'errores',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'errores.home',
      component: () => import('../views/Home.vue')
    },
  ]
}