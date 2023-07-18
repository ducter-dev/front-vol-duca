import { defineStore, storeToRefs } from 'pinia'
import api_volumetricos from '@/config'

export const useUsuarioStore = defineStore('usuario', {
  id: 'usuario',
  state: () => ({
    usuarios: [],
    usuarioSelected: {},
  }),
  getters: {},
  actions: {
    
    async fetch (params) {
      try {
        const { page } = params
        const link = `/users?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.usuarios = data.data
        const obj = {
          ok: true, data: this.usuarios, message: data.message, status, paginacion: data
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

    async insert(usuario) {
      try {
        const userForm = {
          ...usuario,
          estado: 1
        }
        const { data, status } = await api_volumetricos.post('/users/signup', userForm)
        const user = data.data
        this.usuarios.push(user)
        const obj = {
          ok: true, data: user, message: data.message, status
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

    async update(usuariox) {
      try {
        const { data } = await api_volumetricos.put(`/users/${usuariox.id}`, usuariox)
        const user = this.usuarios.find(user => user.id == usuariox.id)
        const { nombre, usuario, perfil_id, empresa_id, correo, empresa, perfil } = data.data
        user.nombre = nombre
        user.usuario = usuario
        user.correo = correo
        user.perfil = perfil
        this.usuarioSelected = {}
  
        const obj = {
          ok: true, data: data.data.usuario, message: data.message, status
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

    async delete(usuario) {
      try {
        const { data, status } = await api_volumetricos.delete(`/users/${usuario.id}`)
        this.usuarios = this.usuarios.filter(user => user.id != usuario.id)
        const { usuario } = data.data
        const obj = {
          ok: true, data: data.data.usuario, message: data.message, status
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
  }
})