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
    async fetch () {
      try {
        const { data, status } = await api_volumetricos.get('/roles')
        this.perfiles = data.data
        const obj = {
          ok: true, data: this.usuarios, message: data.message, status
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
        const { data, status } = await api_volumetricos.post('/roles')
        this.perfiles = data.data
        const obj = {
          ok: true, data: this.usuarios, message: data.message, status
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
    async update (id_perfil) {
      try {
        const { data, status } = await api_volumetricos.put(`/roles/${id_perfil}`)
        this.perfiles = data.data
        const obj = {
          ok: true, data: this.usuarios, message: data.message, status
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