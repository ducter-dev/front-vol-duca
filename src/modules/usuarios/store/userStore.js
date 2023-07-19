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

    async update(form) {
      try {
        const { data, status } = await api_volumetricos.put(`/users/${form.id}`, form)
        const user = this.usuarios.find(user => user.id == form.id)
        const { nombre, usuario, correo, roles } = data.data.usuario
        user.nombre = nombre
        user.usuario = usuario
        user.correo = correo
        user.roles = roles
        this.usuarioSelected = {}
  
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

    async delete(id) {
      try {
        const { data, status } = await api_volumetricos.delete(`/users/${id}`)
        this.usuarios = this.usuarios.filter(user => user.id != id)
        const { usuario } = data.data
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
  }
})