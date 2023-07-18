export default {
  name: 'perfiles',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'perfiles.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'perfiles.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'perfiles.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}