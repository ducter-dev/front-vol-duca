export default {
  name: 'dictamenes',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'dictamenes.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '',
      name: 'dictamenes.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '',
      name: 'dictamenes.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}