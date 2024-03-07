import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useAlmacenStore = defineStore('almacen', {
  id: 'almacen',
  state: () => ({
    almacenes: [],
    almacenSelected: {},
    fechaSelect: new Date(),
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/almacenes?page=${page}`
        
        const { data, status } = await api_volumetricos.get(link)
        this.almacenes = data.data
        const obj = {
          ok: true, data: this.almacenes, message: data.message, status, paginacion: data
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

    async insert(almacen) {
      try {
        const { data, status } = await api_volumetricos.post('/almacenes', almacen)
        const alm = data.data.almacen
        this.almacenes.push(alm)
        const obj = {
          ok: true, data: alm, message: data.message, status
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

    async update(almacen) {
      try {
        const { data, status } = await api_volumetricos.put(`/almacenes/${almacen.id}`, almacen)
        const alm = this.almacenes.find(a => a.id == almacen.id)
        const { cliente_id, fecha, inicio, volumen, fin } = data.data.almacen
        alm.fecha = fecha
        alm.inicio = inicio
        alm.volumen = volumen
        alm.fin = fin
        alm.cliente_id = cliente_id
        this.almacenSelected = {}
        const obj = {
          ok: true, data: alm, message: data.message, status
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

    async delete(id_almacen) {
      try {
        const { data, status } = await api_volumetricos.delete(`/almacenes/${id_almacen}`)
        this.almacenes = this.almacenes.filter(a => a.id != id_almacen)
        const { almacen } = data.data
        const obj = {
          ok: true, data: almacen, message: data.message, status
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

    setFechaSelect(fecha) {
      this.fechaSelect = fecha
    },
  }
})