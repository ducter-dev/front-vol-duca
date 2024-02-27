import { defineStore, storeToRefs } from 'pinia'
import api_volumetricos from '@/config'
const api_url = import.meta.env.VITE_URLAPI

export const useArchivosStore = defineStore('archivo', {
    id: 'archivo',
    state: ()=>({
      archivos: [],
			paginacion: {},
			archivoSelected: {},
			fechaSelected: null,
      archivosMensuales: [],
			paginacionMensual: {}
    }),
    getters: {
        listArchivos: (state) => state.archivos	
    },
    actions:{
		async fetch(params){
			try {
				const { page } = params
				const link = `/archivos?page=${page}`
				const { data, status } = await api_volumetricos.get(link)
				console.log("🚀 ~ file: archivosStore.js:22 ~ fetch ~ data:", data)
				this.archivos = data.data
				const obj = {
          ok: true, data: this.archivos, message: data.message, status, paginacion: data
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

		async fetchMensual(params){
			try {
				const { page } = params
				const link = `/archivosMensuales?page=${page}`
				const { data, status } = await api_volumetricos.get(link)
				this.archivosMensuales = data.data
				const obj = {
          ok: true, data: this.archivosMensuales, message: data.message, status, paginacion: data
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

		async fetchByEnterprice(idEmpresa){
			try {
				const { data } = await api_volumetricos.get(`/archivos/empresa/${idEmpresa}`)
				this.archivos = data.data.data
				const obj = {
						ok: true, 
						data: this.archivos,
						paginacion: data.data
				}
				return obj
			} catch (error) {
					return { ok: false, data: error.response.data}
			}
		},
		
		async fetchMensualByEnterprice(idEmpresa){
			try {
				const { data } = await api_volumetricos.get(`/archivosMensuales/empresa/${idEmpresa}`)
				this.archivosMensuales = data.data.data
				const obj = {
						ok: true, 
						data: this.archivosMensuales,
						paginacionMensual: data.data
				}
				return obj
			} catch (error) {
					return { ok: false, data: error.response.data}
			}
		},

		async fetchLink(link){
			try {
				const text = link.split('/')
				const { data } = await api_volumetricos.get(`/${text[4]}`)
				this.archivos = data.data.data
				const obj = {
						ok: true, 
						data: this.archivos,
						paginacion: data.data
				}
				return obj
			} catch (error) {
					return { ok: false, data: error.response.data}
			}
		},

		async fetchLinkMensual(link){
			try {
				const text = link.split('/')
				const { data } = await api_volumetricos.get(`/${text[4]}`)
				this.archivosMensuales = data.data.data
				const obj = {
						ok: true, 
						data: this.archivosMensuales,
						paginacionMensual: data.data
				}
				return obj
			} catch (error) {
					return { ok: false, data: error.response.data}
			}
		},

		get () {
			return this.archivos
		},

		async insert(form) {
			try {
				const { data } = await api_volumetricos.post(`/json/v3/`, form)
				const archivo = data.data
				const obj = {
						ok: true, data: archivo, message: `Creado archivo diario de ${archivo.balance.fecha}`
				}
				return obj
			
			} catch (error) {
					return { ok: false, data: error.response.data }
			}
		},

		async insertMensual(form) {
			try {
				const { data } = await api_volumetricos.post(`/json/v3/mensual`, form)
				const archivo = data.data
				const obj = {
						ok: true, data: archivo, message: `Creado archivo mensual del período ${archivo.periodo}`
				}
				return obj
			} catch (error) {
					return { ok: false, data: error.response.data }
			}
		},

		async update(archivo) {
			const { data } = await api_volumetricos.put(`/archivos/${archivo.id}`, archivo)
			const arch = this.archivos.find(a => a.id == archivo.id)
			const { id, nombre, ruta, tipo, usuario_id, balance_id, estado } = data.data
			arch.nombre = nombre, 
			arch.ruta = ruta, 
			arch.tipo = tipo, 
			arch.usuario_id = usuario_id, 
			arch.balance_id = balance_id, 
			arch.estado = estado

			this.archivoSelected = {}
			const obj = {
				ok: true, data: data.data
			}
			return obj
		},

		async delete(archivo) {
			const { data } = await api_volumetricos.delete(`/archivos/${archivo.id}`)
			this.esferasSalidas = this.esferasSalidas.filter(dict => dict.id != esferaSalida.id)
			const obj = {
				ok: true, data: data.data
			}
			return obj
		},

		async downloadDiario (url) {
			try {
				const link = `${api_url}${url}`
				window.open(link, '_blank')
			} catch (error) {
				return { ok: false, data: error.message}
			}
		},

		async downloadMensual (url) {
			try {
				const link = `${api_url}${url}`
				window.open(link, '_blank')
			} catch (error) {
				return { ok: false, data: error.message}
			}
		},

		setFechaSelect(fecha) {
			store.fechaSelected = fecha
		},

		getFechaSelected() {
			return this.fechaSelected
		},
    },
})