export default {
  name: 'compuestos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'compuestos.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'compuestos.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'compuestos.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}