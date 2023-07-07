import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useDictamenStore = defineStore('dictamen', {
  id: 'dictamen',
  state: () => ({
    dictamenes: [],
    dictamenSelected: {},
    fechaSelect: new Date(),
    paginacion: {},
  }),
  getters: {
    listDictamenes: (state) => state.dictamenes,
    countDictamenesTemporal: (state) => (state.dictamenes.filter( (d) => d.folioDictamen.includes('TEMP'))).length
  },
  actions: {
    async fetch () {
      try {
        const { data, status } = await api_volumetricos.get(`/dictamenes`)
        this.dictamenes = data.data
        const obj = {
          ok: true, data: this.dictamenes, message: data.message, status, paginacion: data
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

    async fetchLink(params){
			try {
				/* const text = link.split('/') */
				/* const { data, status } = await api_volumetricos.get(`/${text[4]}`) */
        const { page } = params
        const link = `/dictamenes?page=${page}`
        const { data, status } = await api_volumetricos.get(link)
				this.dictamenes = data.data
				const obj = {
          ok: true, data: this.dictamenes, message: data.message, status, paginacion: data
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
        const { data, status } = await api_volumetricos.post('/dictamenes', form)
        const { dictamen } = data.data
        this.dictamenes.push(dictamen)
        const obj = {
          ok: true, data: dictamen, message: data.message, status
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
        console.log(form)
        const { data, status} = await api_volumetricos.put(`/dictamenes/${form.id}`, form)
        const dict = this.dictamenes.find(dict => dict.id == form.id)
        const { dictamen } = data.data
        const { id, rfcDictamen, loteDictamen, folioDictamen, fechaEmisionDictamen, resultadoDictamen, densidad, volumen, cliente_id, balance_id } = dictamen
        dict.id = id
        dict.rfcDictamen = rfcDictamen
        dict.loteDictamen = loteDictamen
        dict.folioDictamen = folioDictamen
        dict.fechaEmisionDictamen = fechaEmisionDictamen
        dict.resultadoDictamen = resultadoDictamen
        dict.densidad = densidad
        dict.volumen = volumen
        dict.cliente_id = cliente_id
        dict.balance_id = balance_id
        this.dictamenSelected = {}
        const obj = {
          ok: true, data: dictamen, message: data.message, status
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

    async delete(idDictamen) {
      console.log("🚀 ~ file: dictamenStore.js:105 ~ delete ~ idDictamen:", idDictamen)
      try {
        const { data, status } = await api_volumetricos.delete(`/dictamenes/${idDictamen}`)
        this.dictamenes = this.dictamenes.filter(dict => dict.id != idDictamen)
        const { dictamen } = data.data
        const obj = {
          ok: true, data: dictamen, message: data.message, status
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