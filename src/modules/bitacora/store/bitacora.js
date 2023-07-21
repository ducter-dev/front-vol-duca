import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useBitacoraStore = defineStore('bitacoras', {
  id: 'bitacoras',
  state: () => ({
    bitacoras: [],
    bitacoraSelected: {},
  }),
  getters: {},
  actions: {
    get () {
      return this.bitacoras
    },
    async fetch (params) {
      try {
        const { page } = params
        const link = `/bitacora?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.bitacoras = data.data
        const obj = {
          ok: true, data: this.bitacoras, message: data.message, status, paginacion: data
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
    
    async insert(bitacora) {
      const { data } = await api_volumetricos.post('/bitacora', bitacora)
      const bit = data.data
      this.bitacoras.push(bit)
      const obj = {
        ok: true, data: bit
      }
      return obj
    },

    async update(bitacora) {
      const { data } = await api_volumetricos.put(`/bitacora/${bitacora.id}`, bitacora)
      const bit = this.bitacoras.find(bit => bit.id == bitacora.id)
      const { fecha, fecha_hora, tipoevento_id, descripcion1, descripcion2, descripcion3, usuario_id, user, tipo_evento } = data.data
      bit.fecha = fecha
      bit.fecha_hora = fecha_hora
      bit.tipoevento_id = tipoevento_id
      bit.descripcion1 = descripcion1
      bit.descripcion2 = descripcion2
      bit.descripcion3 = descripcion3
      bit.usuario_id = usuario_id
      bit.user = user
      bit.tipo_evento = tipo_evento
      this.bitacoraSelected = {}
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    async delete(bitacora) {
      const { data } = await api_volumetricos.delete(`/bitacora/${bitacora.id}`)
      this.bitacoras = this.bitacoras.filter(bit => bit.id != bitacora.id)
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    async filter(fecha) {
      const { data } = await api_volumetricos.get(`/bitacora/fecha/${fecha}`)
        this.bitacoras = data.data
        const obj = {
          ok: true, data: this.bitacoras
        }
        return obj
    },

    selectBitacora (bitacora) {
      this.bitacoraSelected = bitacora
    },

    getSelectedBitacora () {
      return this.bitacoraSelected
    },

    add(bitacora) {
      this.bitacoras.push(bitacora)
    }
  }
})