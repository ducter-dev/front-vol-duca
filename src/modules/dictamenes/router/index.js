export default {
  name: 'dictamenes',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'dictamenes.home',
      component: () => import('../views/Home.vue')
    },
  ]
}