import { defineStore } from 'pinia'
import api_volumetricos from '../../../config'

export const useLoginStore = defineStore('login', {
  id: 'login',
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuth: (state) => state.user !== null
  },
  actions: {
    async login(user) {
      try {
        const { usuario, password } = user
        const dataForm = {
          usuario: usuario,
          password,
        }
        const { data, status } = await api_volumetricos.post('/api/users/login', dataForm)
        const { access_token } = data
        delete user.password
        this.user = data.user
        this.token = access_token
        localStorage.setItem('token', access_token)
        const obj = {
          ok: true, detail: data.user, status 
        }
        return obj
        
      } catch (e) {
        const obj = {
          ok: false, detail: e.response.data, status:e.response.status 
        }
        return obj
      }
    },

    async logout() {
      try {
        const res = await api_volumetricos.post('/api/users/logout')
        if (res.status == 201) {
          this.token = null
          this.user = null
        }
        return res
      } catch (error) {
        return { ok: false, detail: error.response.message}
      }
    },

    async updatePass(formUser) {
      try {
        const { id, correo, contrasena, contrasena_confirmation } = formUser
        const form = {
          correo,
          contrasena,
          contrasena_confirmation
        }
        const { data } = await api_volumetricos.post(`/api/users/updatePassword/${id}`, form)
        this.usuarioSelected = {}
        const obj = {
          ok: true, data: data.data
        }
        return obj
      } catch (error) {
          return {
            ok: false,
            data: error.response.data
          }
      }
    },

    async activateAccount(formUser) {
      const { correo } = formUser
      const form = {
        correo
      }
      const { data, status } = await api_volumetricos.post(`/api/users/activarCuenta`, form)
      if (status === 201) {
        const obj = {
          ok: true, data: data.data
        }
        return obj
      } else {
        const obj = {
          ok: false, data: 'Error'
        }
        return obj
      }
      
    },

    async recoveryPass(correo) {
      const obj = {
        correo
      }
      const { data, status } = await api_volumetricos.post(`/api/users/recuperarPassword`, obj)
      if (status === 200) {
        const obj = {
          ok: true, data: data.data
        }
        return obj
      } else {
        const obj = {
          ok: false, data: 'Error'
        }
        return obj
      }
    },

    async gestionarIntentos (formUser){
      const { usuario, password } = formUser
      const obj = {  usuario, password }
      const { status, data } = await api_volumetricos.post(`api/users/loginFallido`, obj)
      if (status === 201) {
        const obj = {
          ok: true, data: data.data
        }
        return obj
      } else {
        const obj = {
          ok: false, data: 'Error'
        }
        return obj
      }
    },

    async bloquearUsuario (formBloqueo) {
      const { usuario_id, fecha_bloqueo, fecha_desbloqueo } = formBloqueo
      const obj = { usuario_id, fecha_bloqueo, fecha_desbloqueo }
      const { status, data } = await api_volumetricos.post(`api/bloqueados/`, obj)
      if (status === 201) {
        const obj = {
          ok: true, data: data.data
        }
        return obj
      } else {
        const obj = {
          ok: false, detail: e.response.data, status:e.response.status
        }
        return obj
      }
    }
  }
})