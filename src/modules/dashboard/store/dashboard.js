import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useDashboardStore = defineStore('dashboard', {
  id: 'dash',
  state: () => ({
    data: {},
  }),
  getters: {},
  actions: {
    // Antenas
    async fetchData() {
      try {
        const res = await scadaApi.get('/opc/antena/entrada')
        const { data } = res
        this.antenaEntrada = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    }
  },
})