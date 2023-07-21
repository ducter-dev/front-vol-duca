import { defineStore } from 'pinia'
import api_volumetricos from '@/config'


export const useEventoStore = defineStore('eventos', {
  id: 'eventos',
  state: () => ({
    eventos: [],
    eventoSelected: {},
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/eventos?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.eventos = data.data
        const obj = {
          ok: true, data: this.eventos, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/eventos', form)
        const evento = data.data.evento
        this.eventos.push(evento)
        const obj = {
          ok: true, data: evento, message: data.message, status
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
        const { data, status } = await api_volumetricos.put(`/eventos/${form.id}`, form)
        const evento = this.eventos.find(p => p.id == form.id)
        const { descripcion } = data.data.evento
        evento.descripcion = descripcion
        this.eventoSelected = {}
  
        const obj = {
          ok: true, data: evento, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/eventos/${id}`)
        this.eventos = this.eventos.filter(p => p.id != id)
        const { evento } = data.data
        const obj = {
          ok: true, data: evento, message: data.message, status
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