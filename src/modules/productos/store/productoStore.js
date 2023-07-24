import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useProductoStore = defineStore('producto', {
  id: 'producto',
  state: () => ({
    productos: [],
    productoSelected: {},
  }),
  getters: {
    listProductos: (state) => state.productos
  },
  actions: {

    async fetch(params) {
      try {
        const { page } = params
        const link = `/productos?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
				this.productos = data.data
				const obj = {
          ok: true, data: this.productos, message: data.message, status, paginacion: data
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
    async fetchAll() {
      try {
        const link = `/productos`
        const { data, status } = await api_volumetricos.get(link)
				this.productos = data.data
				const obj = {
          ok: true, data: this.productos, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/productos', form)
        const { producto } = data.data
        this.productos.push(producto)
        const obj = {
          ok: true, data: producto, message: data.message, status
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
        const { data, status } = await api_volumetricos.put(`/productos/${form.id}`, form)
        const producto = this.productos.find(d => d.id == form.id)
        const { descripcion } = data.data.producto
        producto.descripcion = descripcion
        this.productoSelected = {}
        const obj = {
          ok: true, data: data.data.producto, message: data.message, status
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
        const { data, status } = await api_volumetricos.delete(`/productos/${id}`)
        this.productos = this.productos.filter(densi => densi.id != id)
        const { producto } = data.data
        const obj = {
          ok: true, data: producto, message: data.message, status
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