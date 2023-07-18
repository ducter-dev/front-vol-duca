export default {
  name: 'usuarios',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'usuarios.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'usuarios.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'usuarios.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}