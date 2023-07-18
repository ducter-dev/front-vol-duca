export default {
  name: 'revisiones',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'revisiones.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'revisiones.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'revisiones.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}