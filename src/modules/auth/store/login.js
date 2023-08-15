import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useLoginStore = defineStore('login', {
  id: 'login',
  state: () => ({
    user: null,
    token: null,
    id_caducado: 0,
  }),
  getters: {
    isAuth: (state) => state.user !== null
  },
  actions: {
    async login(user) {
      try {
        const { usuario, password } = user
        const dataForm = {
          usuario,
          password,
        }
        const res = await api_volumetricos.post('/users/login', dataForm)
        const { data, status } = res
        const { access_token } = data.data.user
        delete user.password
        this.user = data.data.user 
        this.token = access_token
        localStorage.setItem('token', access_token)
        localStorage.setItem('user', JSON.stringify(this.user))
        const obj = {
          data: data.data.user, status, message: data.message
        }
        return obj
      } catch (error) {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          if (error.response.status == 402) {
            this.id_caducado = error.response.data.data
          }

          const obj = {
            data: null , message: error.response.data.message, status: error.response.status 
          }
          return obj
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          const obj = {
            data: null, message: "Conexión rechazada con nuestros servidores. <br> Código de error: <strong>0</strong>", status: error.request.status 
          }
          return obj
        } else {
          const obj = {
            data: null, message: "Ha ocurrido un error inesperado, por favor vuelve a intentarlo.", status: "00" 
          }
          return obj
        }
      }
    },

    async logout() {
      try {
        const res = await api_volumetricos.post('/users/logout')
        console.log("🚀 ~ file: login.js:71 ~ logout ~ res:", res)
        if (res.status == 200) {
          this.token = null
          this.user = null
        }
        return res
      } catch (error) {
        return { ok: false, detail: error.response.message}
      }
    },

    async updatePass(form) {
      try {
        const { data, status } = await api_volumetricos.post(`/users/updatePassword`, form)
        const usuario = data.data.usuario
        
        const obj = {
          ok: true, data: usuario, message: data.message, status
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async activateAccount(formUser) {
      const { correo } = formUser
      const form = {
        correo
      }
      const { data, status } = await api_volumetricos.post(`/users/activarCuenta`, form)
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
      try {
        const form = {
          correo
        }
        console.log("🚀 ~ file: login.js:128 ~ recoveryPass ~ form:", form)
        const { status, data } = await api_volumetricos.post(`/users/recuperarPassword`, form)
        const obj = {
          message: data.message, status
        }
        return obj
      } catch (error) {
        console.log("🚀 ~ file: login.js:120 ~ recoveryPassword ~ error:", error)
        if (error.response) {
          console.log("🚀 ~ file: login.js:122 ~ recoveryPassword ~ error.response:", error.response)
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          if (error.response) {
            const obj = {
              message: error.response.data.message, status: error.response.status 
            }
            return obj
          } else {
            // Si existe error manda un toast
            const obj = {
              message:`Vaya, algo salió mal en nuestros servidores. <br> Código de error: <strong>${error.response.status}</strong>`, status: error.response.status 
            }
            return obj
          }
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          const obj = {
            message: "Conexión rechazada con nuestros servidores. <br> Código de error: <strong>0</strong>", status: error.request.status 
          }
          return obj
        } else {
          const obj = {
            message:"Ha ocurrido un error inesperado, por favor vuelve a intentarlo.", status: "00" 
          }
          return obj
        }
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

    async locked (usuario) {
      try {
        const form = {
          usuario
        }
        console.log("🚀 ~ file: login.js:182 ~ locked ~ form:", form)
        const { status, data } = await api_volumetricos.post(`/users/bloquear-usuario/`, form)
        console.log("🚀 ~ file: login.js:186 ~ locked ~ status:", status)
        console.log("🚀 ~ file: login.js:186 ~ locked ~ data:", data)
        const obj = {
          data: data.data.bloqueo, message: data.message, status
        }
        return obj
      } catch (error) {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          const obj = {
            data: null , message:error.response.data.message, status: error.response.status 
          }
          return obj
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          const obj = {
            data: null, message: "Conexión rechazada con nuestros servidores. <br> Código de error: <strong>0</strong>", status: error.request.status 
          }
          return obj
        } else {
          const obj = {
            data: null, message: "Ha ocurrido un error inesperado, por favor vuelve a intentarlo.", status: "00" 
          }
          return obj
        }
      }
    }
  },
  persist: true
})