import { defineStore, storeToRefs } from 'pinia'
import api_volumetricos from '@/config'

export const usePermisoStore = defineStore('permisos', {
  id: 'permisos',
  state: () => ({
    permisos: [],
    permisoSelected: {},
  }),
  getters: {},
  actions: {
    async fetchAll () {
      try {
        const link = `/permisos-all`
        const { data, status } = await api_volumetricos.get(link)
        this.permisos = data.data
        const obj = {
          ok: true, data: this.permisos, message: data.message, status
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

    async fetch (params) {
      try {
        const { page } = params
        const link = `/permisos?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.permisos = data.data
        const obj = {
          ok: true, data: this.permisos, message: data.message, status, paginacion: data
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

    async insert (form) {
      try {
        const { data, status } = await api_volumetricos.post('/permisos', form)
        const permiso = data.data
        this.permisos.push(permiso)
        const obj = {
          ok: true, data: permiso, message: data.message, status
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

    async update (form) {
      try {
        const { data, status } = await api_volumetricos.put(`/permisos/${form.id}`, form)
        const permiso = this.permisos.find(p => p.id == form.id)
        const { nombre, descripcion, guard_name } = data.data
        permiso.name = nombre
        permiso.descripcion = descripcion
        permiso.guard_name = guard_name
        this.perfilSelected = {}
  
        const obj = {
          ok: true, data: permiso, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/permisos/${id}`)
        this.permisos = this.permisos.filter(p => p.id != id)
        const { permiso } = data.data
        const obj = {
          ok: true, data: permiso, message: data.message, status
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