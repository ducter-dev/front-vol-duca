export default {
  name: 'auth',
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: '',
      name: 'auth.login',
      component: () => import('../views/Login.vue')
    },
    {
      path: 'registro',
      name: 'auth.register',
      component: () => import('../views/Register.vue')
    },
    {
      path: 'resetpassword',
      name: 'auth.resetpassword',
      component: () => import('../views/ResetPassword.vue')
    },    
    {
      path: 'rescutepassword',
      name: 'auth.rescutepassword',
      component: () => import('../views/RescutePassword.vue')
    },
  ]
}