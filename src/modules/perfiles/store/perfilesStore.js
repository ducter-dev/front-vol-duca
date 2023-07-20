import { defineStore, storeToRefs } from 'pinia'
import api_volumetricos from '@/config'

export const usePerfilStore = defineStore('perfiles', {
  id: 'perfiles',
  state: () => ({
    perfiles: [],
    perfilSelected: {},
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/roles?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.perfiles = data.data
        const obj = {
          ok: true, data: this.perfiles, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/roles', form)
        const perfil = data.data.rol
        this.perfiles.push(perfil)
        const obj = {
          ok: true, data: perfil, message: data.message, status
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
        const { data, status } = await api_volumetricos.put(`/roles/${form.id}`, form)
        const perfil = this.perfiles.find(p => p.id == form.id)
        const { name, guard_name, permissions } = data.data.rol
        perfil.name = name
        perfil.guard_name = guard_name
        perfil.permissions = permissions
        this.perfilSelected = {}
  
        const obj = {
          ok: true, data: perfil, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/roles/${id}`)
        this.perfiles = this.perfiles.filter(p => p.id != id)
        const { rol } = data.data
        const obj = {
          ok: true, data: rol, message: data.message, status
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