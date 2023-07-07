import { defineStore } from 'pinia'
import api_volumetricos from '@/config'

export const useBalanceStore = defineStore('balance', {
  id: 'balance',
  state: () => ({
    balances: [],
    balanceSelected: {},
  }),
  getters: {
    getBalancesByDate: (state) => (fecha) => state.balances.find((balance) => balance.fecha === fecha)
  },
  actions: {
    async fetch () {
      try {
        const { data } = await api_volumetricos.get('/balances')
        this.balances = data.data
        const obj = {
          ok: true, data: this.balances
        }
        return obj
      } catch (error) {
        return { ok: false, data: error.message}
      }
    },

    get () {
      return this.balances
    },

    async insert(balance) {
      const { data } = await api_volumetricos.post('/balances', balance)
      const bal = data.data
      this.balances.push(bal)
      const obj = {
        ok: true, data: bal
      }
      return obj
    },

    async update(balance) {
      const { data } = await api_volumetricos.put(`/balances/${balance.id}`, balance)
      const dict = this.balances.find(dict => dict.id == balance.id)
      console.log(dict)
      const { id, rfcDictamen, loteDictamen, folioDictamen, fechaEmisionDictamen, resultadoDictamen, densidad, volumen, cliente_id } = data.data
      dict.id = id
      dict.rfcDictamen = rfcDictamen
      dict.loteDictamen = loteDictamen
      dict.folioDictamen = folioDictamen
      dict.fechaEmisionDictamen = fechaEmisionDictamen
      dict.resultadoDictamen = resultadoDictamen
      dict.densidad = densidad
      dict.volumen = volumen
      dict.cliente_id = cliente_id
      this.balanceSelected = {}
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    async delete(balance) {
      const { data } = await api_volumetricos.delete(`/balances/${balance.id}`)
      this.balances = this.balances.filter(dict => dict.id != balance.id)
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    async fetchBalance(idBalance) {
      try {
        const { data } = await api_volumetricos.get(`/balances/${idBalance}`)
        const obj = {
          ok: true, data: data.data
        }
        return obj

      } catch (error) {
        const obj = {
          ok: false, data: error.response.data
        }
        return obj
      }
    },

    cambiarBalance(balance) {
      console.log('cambiarBalance')
      const balanceStore = this.balances.find( (bal) => bal.id_balance == balance.id_balance )
      console.log(balanceStore)
      const { tanques_salida } = balance
      console.log(tanques_salida)
      balanceStore.tanques_salida = tanques_salida
      console.log(balanceStore)
    },
  }
})