import { defineStore } from 'pinia'
import api_volumetricos from '@/config'


export const useCompuestoStore = defineStore('compuestos', {
  id: 'compuestos',
  state: () => ({
    compuestos: [],
    compuestoSelected: {},
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/compuestos?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.compuestos = data.data
        const obj = {
          ok: true, data: this.compuestos, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/compuestos', form)
        const compuesto = data.data.compuesto
        this.compuestos.push(compuesto)
        const obj = {
          ok: true, data: compuesto, message: data.message, status
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
        const { data, status } = await api_volumetricos.put(`/compuestos/${form.id}`, form)
        const compuesto = this.compuestos.find(p => p.id == form.id)
        const { rfcCompuesto, nombreCompuesto } = data.data.compuesto
        compuesto.rfcCompuesto = rfcCompuesto
        compuesto.nombreCompuesto = nombreCompuesto
        this.compuestoSelected = {}
  
        const obj = {
          ok: true, data: compuesto, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/compuestos/${id}`)
        this.compuestos = this.compuestos.filter(p => p.id != id)
        const { compuesto } = data.data
        const obj = {
          ok: true, data: compuesto, message: data.message, status
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