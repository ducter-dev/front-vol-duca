export default {
  name: 'permisos',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'permisos.home',
      component: () => import('../views/Home.vue')
    },
    {
      path: 'nuevo',
      name: 'permisos.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: 'editar',
      name: 'permisos.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}