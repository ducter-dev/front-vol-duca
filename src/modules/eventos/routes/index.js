export default {
  name: 'eventos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'eventos.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'eventos.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'eventos.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}