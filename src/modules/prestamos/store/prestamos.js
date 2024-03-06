import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const usePrestamoStore = defineStore('producto', {
  id: 'prestamo',
  state: () => ({
    prestamos: [],
    prestamoSelected: {},
    fechaSelect: new Date(),
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/prestamos?page=${page}`
        
        const { data, status } = await api_volumetricos.get(link)
        this.prestamos = data.data
        const obj = {
          ok: true, data: this.prestamos, message: data.message, status, paginacion: data
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

    async insert(prestamo) {
      try {
        const { data, status } = await api_volumetricos.post('/prestamos', prestamo)
        const prest = data.data
        this.prestamos.push(prest)
        const obj = {
          ok: true, data: prest, message: data.message, status
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

    async update(prestamo) {
      const { data } = await api_volumetricos.put(`/prestamos/${prestamo.id}`, prestamo)
      const p = this.prestamos.find(per => per.id == prestamo.id)
      const { cliente_id_c, cliente_id_v, cantidad, fecha } = data.data
      p.cliente_id_c = cliente_id_c
      p.cliente_id_v = cliente_id_v
      p.cantidad = cantidad
      p.cliente_id_c = cliente_id_c
      this.prestamoSelected = {}
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    async delete(prestamo) {
      const { data } = await api_volumetricos.delete(`/prestamos/${prestamo.id}`)
      this.prestamos = this.prestamos.filter(per => per.id != prestamo.id)
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    setFechaSelect(fecha) {
      this.fechaSelect = fecha
    },
  }
})