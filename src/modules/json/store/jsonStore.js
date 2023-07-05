import { defineStore } from 'pinia'
import api_volumetricos from '@/config'
const api_url = import.meta.env.VITE_URLAPI

export const useJsonStore = defineStore('json', {
  id: 'json',
  state: () => ({
    json: {},
    jsonSelected: {},
    jsonMensual: {},
  }),
  getters: {},
  actions: {
    async fetchDiario (fecha) {
      try {
        const { data } = await api_volumetricos.post(`/json/v3/empresas/1/fecha/${fecha}/json/data/unidad/tons`)
        this.json = data
        const obj = {
          ok: true, data: this.json
        }
        return obj
      } catch (error) {
        return { ok: false, data: error.response.data}
      }
    },
    
    async downloadDiario (fecha) {
      try {
        console.log(api_url)
        const link = `${api_url}/json/v3/empresas/1/fecha/${fecha}/json/export/unidad/tons`
        window.open(link, '_blank')
        
      } catch (error) {
        return { ok: false, data: error.message}
      }
    },

    async fetchMensual (fechaInicio, fechaFinal) {
      try {
        const res = await api_volumetricos.get(`/empresas/1/fechaInicio/${fechaInicio}/fechaFinal/${fechaFinal}/json/data/unidad/tons`)
        const { data } = res
        this.jsonMensual = data[0]
        const obj = {
          ok: true, data: this.jsonMensual
        }
        return obj
      } catch (error) {
        return { ok: false, data: error.response.data}
      }
    },
    
    async downloadMensual (fechaInicio, fechaFinal) {
      try {
        
        const res = await api_volumetricos.get(`/empresas/1/fechaInicio/${fechaInicio}/fechaFinal/${fechaFinal}/json/export/unidad/tons`)
        const { data } = res
        const url = data.data
        const link = `${api_url}${url}`
        return { ok: true, data: link }
      } catch (error) {
        return { ok: false, data: error.response.data }
      }
    },

    async informacionActualizada (fecha) {
      try {
        const { data } = await api_volumetricos.get(`/json/fecha/${fecha}`)
        const obj = {
          data: data, ok:true
        }
        return obj
      } catch (error) {
        return { ok: false, data: error.message}
      }
    },

    gerURL (ruta) {
      console.log(`${api_url}${ruta}`)
      return `${api_url}${ruta}`
    },
  }
})