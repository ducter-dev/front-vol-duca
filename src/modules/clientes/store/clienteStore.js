import { defineStore } from 'pinia'
import api_volumetricos from '@/config'


export const useClienteStore = defineStore('clientes', {
  id: 'clientes',
  state: () => ({
    clientes: [],
    clienteSelected: {},
  }),
  getters: {},
  actions: {
    async fetch (params) {
      try {
        const { page } = params
        const link = `/clientes?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
        this.clientes = data.data
        const obj = {
          ok: true, data: this.clientes, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/clientes', form)
        const cliente = data.data.cliente
        this.clientes.push(cliente)
        const obj = {
          ok: true, data: cliente, message: data.message, status
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
        const { data, status } = await api_volumetricos.put(`/clientes/${form.id}`, form)
        const cliente = this.clientes.find(p => p.id == form.id)
        const { rfcCliente, nombreCliente } = data.data.cliente
        cliente.rfcCliente = rfcCliente
        cliente.nombreCliente = nombreCliente
        this.clienteSelected = {}
  
        const obj = {
          ok: true, data: perfil, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/clientes/${id}`)
        this.clientes = this.clientes.filter(p => p.id != id)
        const { cliente } = data.data
        const obj = {
          ok: true, data: cliente, message: data.message, status
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