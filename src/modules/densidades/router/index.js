export default {
  name: 'densidades',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'densidades.home',
      component: () => import('../views/Home.vue')
    },
  ]
}