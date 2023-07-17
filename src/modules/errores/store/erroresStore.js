import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useErrorStore = defineStore('error', {
  id: 'error',
  state: () => ({
    errores: [],
    paginacion: {},
  }),
  getters: {
    listErrores: (state) => state.errores
  },
  actions: {
    async fetch(params) {
      try {
        const { page } = params
        const link = `/errores?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.errores = data.data
        const obj = {
          ok: true, data: this.errores, message: data.message, status, paginacion: data
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
  },
})