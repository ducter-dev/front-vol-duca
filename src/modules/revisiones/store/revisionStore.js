import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useRevisionStore = defineStore('revision', {
  id: 'revision',
  state: () => ({
    revisiones: [],
    revisionSelected: {},
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/revisiones?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.revisiones = data.data
        const obj = {
          ok: true, data: this.revisiones, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/revisiones', form)
        const { revision } = data.data
        this.revisiones.push(revision)
        const obj = {
          ok: true, data: revision, message: data.message, status
        }
        return obj
      }   catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async update(form) {
      try {
        const { data, status } = await api_volumetricos.put(`/revisiones/${form.id}`, form)
        const revisionSt = this.revisiones.find(r => r.id == form.id)
        console.log("🚀 ~ file: revisionStore.js:54 ~ update ~ data.data.revision:", data.data.revision)
        const { descripcion, inicio, periodo, proxima, estado } = data.data.revision
        revisionSt.descripcion = descripcion
        revisionSt.inicio = inicio
        revisionSt.periodo = periodo
        revisionSt.proxima = proxima
        revisionSt.estado = estado
        this.revisionSelected = {}
        const obj = {
          ok: true, data: data.data.revision, message: data.message, status
        }
        console.log("🚀 ~ file: revisionStore.js:64 ~ update ~ obj:", obj)
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async delete(revision) {
      const { data } = await api_volumetricos.delete(`/revisiones/${revision.id}`)
      this.revisiones = this.revisiones.filter(empre => empre.id != revision.id)
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },
  }
})