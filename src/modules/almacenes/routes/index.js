export default {
  name: 'almacenes',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'almacenes.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'almacenes.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'almacenes.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}