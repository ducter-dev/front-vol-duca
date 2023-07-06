export default {
  name: 'archivos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'archivos.home',
      component: () => import('../views/Home.vue')
    },
  ]
}