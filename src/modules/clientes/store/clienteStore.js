import { defineStore } from 'pinia'
import api_volumetricos from '@/config'


export const useClienteStore = defineStore('clientes', {
  id: 'clientes',
  state: () => ({
    clientes: [],
    bitacoraSelected: {},
  }),
  getters: {},
  actions: {
    get() {
      return this.clientes
    },

    async fetch() {
      try {
        const { data, status } = await api_volumetricos.get('/clientes')
        this.clientes = data.data
        const obj = {
          ok: true, data: this.clientes, message: data.message, status
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    }
  }
})