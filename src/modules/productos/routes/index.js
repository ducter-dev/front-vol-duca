export default {
  name: 'productos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'productos.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'productos.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'productos.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}