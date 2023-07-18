export default {
  name: 'bitacora',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'bitacora.home',
      component: () => import('../views/Home.vue')
    },
  ]
}