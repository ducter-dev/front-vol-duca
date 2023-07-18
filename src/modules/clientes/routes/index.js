export default {
  name: 'clientes',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'clientes.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'clientes.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'clientes.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}