export default {
  name: 'prestamos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'prestamos.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'prestamos.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'prestamos.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}