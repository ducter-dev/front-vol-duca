import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useEmpresaStore = defineStore('empresa', {
  id: 'empresa',
  state: () => ({
    empresas: [],
    empresaSelected: {},
    currentEmpresa: {},
  }),
  getters: {},
  actions: {
    async get () {
      try {
        const { data } = await api_volumetricos.get('/empresas')
        this.empresas = data.data
        this.currentEmpresa = this.empresas[0]
        const obj = {
          ok: true, data: this.empresas
        }
        return obj
      } catch (error) {
        return { ok: false, data: error.message}
      }
    },

    async showEmpresa(empresa) {
      try {
        const { data } = await api_volumetricos.get(`/empresas/${empresa}`, empresa)
        this.empresaSel = data.data
        const obj = {
          ok: true, data: this.empresaSel
      }
        return obj
      }   catch (error) {
        const obj = {
          ok: false, detail: error.response.data, status:error.response.status 
        }
        return obj
      }
    },

    async insert(empresa) {
      try {
        const { data } = await api_volumetricos.post('/empresas', empresa)
        const empre = data.data
        this.empresas.push(empre)
        const obj = {
          ok: true, data: empre
      }
        return obj
      }   catch (error) {
        const obj = {
          ok: false, detail: error.response.data, status:error.response.status 
        }
        return obj
      }
    },

    async update(empresa) {
      const { data } = await api_volumetricos.put(`/empresas/${empresa.id}`, empresa)
      const empre = this.empresas.find(empre => empre.id == empresa.id)
      const { id, descripcion, version, rfc_contribuyente, rfc_representante, proveedor, tipo_caracter,
      modalidad_permiso, num_permiso, clave_instalacion, descripcion_instalacion, geolocalizacion_latitud,
      geolocalizacion_longitud, numero_tanques, numero_ductos_entradas_salidas, numero_ductos_distribucion,
      fecha_hora_corte, producto_omision, producto } = data.data
      empre.id = id
      empre.descripcion = descripcion
      empre.version = version
      empre.rfc_contribuyente = rfc_contribuyente
      empre.rfc_representante = rfc_representante
      empre.proveedor = proveedor
      empre.tipo_caracter = tipo_caracter
      empre.modalidad_permiso = modalidad_permiso
      empre.num_permiso = num_permiso
      empre.clave_instalacion = clave_instalacion
      empre.descripcion_instalacion = descripcion_instalacion
      empre.geolocalizacion_latitud = geolocalizacion_latitud
      empre.geolocalizacion_longitud = geolocalizacion_longitud
      empre.numero_tanques = numero_tanques
      empre.numero_ductos_entradas_salidas = numero_ductos_entradas_salidas
      empre.numero_ductos_distribucion = numero_ductos_distribucion
      empre.fecha_hora_corte = fecha_hora_corte
      empre.producto_omision = producto_omision
      empre.producto = producto
      this.empresaSelected = {}
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    async delete(empresa) {
      const { data } = await api_volumetricos.delete(`/empresas/${empresa.id}`)
      this.empresas = this.empresas.filter(empre => empre.id != empresa.id)
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },
  }
})