export default {
  name: 'empresas',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'empresas.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'empresas.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'empresas.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}