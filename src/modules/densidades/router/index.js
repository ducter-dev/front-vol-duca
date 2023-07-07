export default {
  name: 'densidades',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'densidades.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '',
      name: 'densidades.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '',
      name: 'densidades.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}