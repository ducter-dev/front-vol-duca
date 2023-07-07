<script>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import useBalance from '@/modules/balances/composables/balance'
import useCliente from '@/modules/clientes/composables/cliente'
import { format } from 'date-fns'
import useDictamen from '@/modules/dictamenes/composables/dictamen'
import useEventsBus from "@/layout/eventBus"

export default {
  components: {},
  setup(props, context) {
    const { getDictamenSelected, countDictamenesTemporal, getSelectFecha } = useDictamen()
    const { getClientes } = useCliente()
    
    const router = useRouter()
    const date = ref(new Date())
    const dictSelect = computed(() => getDictamenSelected())
    console.log("🚀 ~ file: FormDictamen.vue:19 ~ setup ~ dictSelect:", dictSelect)
    const clientes = computed(() => getClientes())
    const balanceSelect = ref({})
    const { emit } = useEventsBus()

    const fechaStore = getSelectFecha()
    date.value = fechaStore

    const initialFormData = () => ({
      rfcDictamen: '',
      loteDictamen: '0',
      folioDictamen: '',
      fechaInicioDictamen: date.value,
      fechaEmisionDictamen: date.value,
      resultadoDictamen: 'Positivo',
      densidad: 0.5055,
      volumen: 0,
      cliente_id: null,
      balance_id: null
    })

    const dictamen = reactive(initialFormData())

    const clienteSelected = ref({})
    const showTemporal = ref(false)
    const countDictamenesTemp = computed(() => countDictamenesTemporal())

    const { getBalanceByDate } = useBalance()

    if (Object.keys(dictSelect.value).length > 0) {
      console.log('Editar')
      showTemporal.value = dictSelect.value.folioDictamen.includes('TEMP')
      const clienteSel = clientes.value.find( (cliente) => cliente.id == dictSelect.value.cliente_id)
      clienteSelected.value = clienteSel
      const yearI = (dictSelect.value.fechaInicioDictamen.substr(0,4))
      const monthI = parseInt(dictSelect.value.fechaInicioDictamen.substr(5,2)) - 1
      const dayI = (dictSelect.value.fechaInicioDictamen.substr(8,2))
      const fechaInicioDictamen =  new Date(yearI, monthI, dayI)
      const yearE = (dictSelect.value.fechaEmisionDictamen.substr(0,4))
      const monthE = parseInt(dictSelect.value.fechaEmisionDictamen.substr(5,2)) - 1
      const dayE = (dictSelect.value.fechaEmisionDictamen.substr(8,2))
      const fechaEmisionDictamen =  new Date(yearE, monthE, dayE)
      balanceSelect.value = getBalanceByDate(format(fechaEmisionDictamen, 'yyyy-MM-dd'))
      dictamen.id = dictSelect.value.id
      dictamen.rfcDictamen = dictSelect.value.rfcDictamen
      dictamen.loteDictamen = dictSelect.value.loteDictamen
      dictamen.folioDictamen = dictSelect.value.folioDictamen
      dictamen.fechaInicioDictamen = fechaInicioDictamen
      dictamen.fechaEmisionDictamen = fechaEmisionDictamen
      dictamen.resultadoDictamen = dictSelect.value.resultadoDictamen
      dictamen.densidad = dictSelect.value.densidad
      dictamen.volumen = dictSelect.value.volumen
      dictamen.cliente_id = dictSelect.value.cliente_id
      dictamen.balance_id = dictSelect.value.balance.id
    }

    const formatPickerInicio = () => {
      return format(dictamen.fechaInicioDictamen, 'dd-MM-yyyy')
    }

    const formatPickerEmision = () => {
      return format(dictamen.fechaEmisionDictamen, 'dd-MM-yyyy')
    }

    const resetform = () => {
      Object.assign(dictamen, initialFormData())
    }

    const handleSubmit = () => {
      if (!balanceSelect.value) {
        emit('ErrorData', 'No existe balance creado aún.')
      }
      const obj = {
        id: dictamen.id,
        rfcDictamen: dictamen.rfcDictamen,
        loteDictamen: dictamen.loteDictamen,
        folioDictamen: dictamen.folioDictamen,
        fechaInicioDictamen: format(dictamen.fechaEmisionDictamen, 'yyyy-MM-dd'),
        fechaEmisionDictamen: format(dictamen.fechaEmisionDictamen, 'yyyy-MM-dd'),
        resultadoDictamen: dictamen.resultadoDictamen,
        densidad: dictamen.densidad,
        volumen: dictamen.volumen,
        cliente_id: dictamen.cliente_id,
        rutaDictamen: null,
        balance_id: balanceSelect.value.id,
      }
      console.log("🚀 ~ file: FormDictamen.vue:105 ~ handleSubmit ~ obj:", obj)
      context.emit('submitForm', obj)
      resetform()
    }

    const goBack = () => {
      router.go(-1)
    }

    watch(dictamen, () => {
      console.log(dictamen)

      if (dictamen) {
        const fechaDictamen = format(dictamen.fechaEmisionDictamen, 'yyyy-MM-dd')
        console.log(fechaDictamen)
        balanceSelect.value = getBalanceByDate(fechaDictamen)
        console.log("🚀 ~ file: FormDictamen.vue:93 ~ watch ~ balanceSelect:", balanceSelect)
      }
    })

    watch(clienteSelected, () => {
      dictamen.rfcDictamen = clienteSelected.value.rfcCliente
      dictamen.cliente_id = clienteSelected.value.id
    })

    watch(showTemporal, () => {
      if (showTemporal.value) {
        let numFolio = ''
        switch (true) {
          case (countDictamenesTemp.value < 10):
            numFolio = `TEMP-00${countDictamenesTemp.value + 1}`
            break
          case (countDictamenesTemp.value >= 10 && countDictamenesTemp.value < 100):
            numFolio = `TEMP-0${countDictamenesTemp.value + 1}`
            break
          case (countDictamenesTemp.value >= 100 && countDictamenesTemp.value < 1000):
            numFolio = `TEMP-${countDictamenesTemp.value + 1}`
            break
        }
        dictamen.folioDictamen = numFolio
        dictamen.loteDictamen = '0'
        dictamen.densidad = 0.5055
        dictamen.volumen = 0
      }
    })

    return {
      dictamen,
      formatPickerInicio,
      formatPickerEmision,
      clientes,
      handleSubmit,
      balanceSelect,
      clienteSelected,
      showTemporal,
      countDictamenesTemp,
      goBack,
    }
  }
}
</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <!-- <div class="relative z-0 w-full mb-6 group">
      <div class="flex items-center mb-4">
        <input id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" v-model="showTemporal">
        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Dictámen Temporal</label>
      </div>
    </div> -->
    <div class="relative z-0 w-full mb-6 group">
      <label for="clientes" class="block mb-2 text-sm font-medium text-gray-900">Cliente</label>
      <select id="clientes" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="clienteSelected">
        <option v-for="c in clientes" :key="c.id" :value="c">{{ c.nombreCliente }}</option>
      </select>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="name" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="dictamen.rfcDictamen"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RFC Dictamen</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="dictamen.loteDictamen" disabled />
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lote Dictamen</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="dictamen.folioDictamen" />
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Folio Dictamen</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <Datepicker class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="fechaHoraCorte" locale="es" :maxDate="new Date()" :format="formatPickerInicio" autoApply v-model="dictamen.fechaInicioDictamen" :enableTimePicker="false"/>
        <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <Datepicker class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="fechaHoraCorte" locale="es" :maxDate="new Date()" :format="formatPickerEmision" autoApply v-model="dictamen.fechaEmisionDictamen" :enableTimePicker="false"/>
        <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="dictamen.resultadoDictamen" disabled />
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resultado</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model.number="dictamen.densidad" type="number" min="0.5000" max="0.5600" step="0.0001"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Densidad</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model.number="dictamen.volumen" type="number" />
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Volumen</label>
    </div>
    
    <div class="flex items-center md:justify-end">
      <button type="button" class="text-dark bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2" @click="goBack">Cancelar</button>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2">Guardar</button>
    </div>
  </form>
</template>

