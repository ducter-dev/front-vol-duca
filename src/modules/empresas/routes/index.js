export default {
  name: 'empresas',
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'Empresas',
      component: () => import('../views/Empresas.vue')
    },
    {
      path: 'nuevo',
      name: 'EmpresaNuevo',
      component: () => import('../views/EmpresaNuevo.vue')
    },
    {
      path: 'editar',
      name: 'EmpresaEditar',
      component: () => import('../views/EmpresaEditar.vue')
    },
  ]
}