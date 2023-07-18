import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useDensidadStore = defineStore('densidad', {
  id: 'densidad',
  state: () => ({
    densidades: [],
    densidadSelected: {},
  }),
  getters: {
    listDensidades: (state) => state.densidades
  },
  actions: {

    async fetch(params) {
      try {
        const { page } = params
        const link = `/densidades?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
				this.densidades = data.data
				const obj = {
          ok: true, data: this.densidades, message: data.message, status, paginacion: data
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

    async insert(form) {
      try {
        const { data, status } = await api_volumetricos.post('/densidades', form)
        const { densidad } = data.data
        this.densidades.push(densidad)
        const obj = {
          ok: true, data: densidad, message: data.message, status
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
        const { data, status } = await api_volumetricos.put(`/densidades/${form.id}`, form)
        const densidadSt = this.densidades.find(d => d.id == form.id)
        const { balance_id, densidad } = data.data.densidad
        densidadSt.balance_id = balance_id
        densidadSt.densidad = densidad
        this.densidadSelected = {}
        const obj = {
          ok: true, data: data.data.densidad, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/densidades/${id}`)
        this.densidades = this.densidades.filter(densi => densi.id != id)
        const { densidad } = data.data
        const obj = {
          ok: true, data: densidad, message: data.message, status
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