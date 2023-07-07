<script>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import useBalance from '@/modules/balances/composables/balance'
import { format } from 'date-fns'
import useDensidad from '../composables/densidades'
import useEventsBus from "@/layout/eventBus"

export default {
  components: {},
  setup(props, context) {
    const { getDensidadSelected } = useDensidad()
    
    const router = useRouter()
    const date = ref(new Date())
    const densidadSelect = computed(() => getDensidadSelected())
    console.log("🚀 ~ file: FormDictamen.vue:19 ~ setup ~ densidadSelect:", densidadSelect)
    const balanceSelect = ref({})
    const { emit } = useEventsBus()

    const initialFormData = () => ({
      densidad: '',
      balance_id: null
    })

    const densidad = reactive(initialFormData())

    const { getBalanceByDate } = useBalance()

    if (Object.keys(densidadSelect.value).length > 0) {
      console.log('Editar')
      const year = (densidadSelect.value.balance.fecha.substr(0,4))
      const month = parseInt(densidadSelect.value.balance.fecha.substr(5,2)) - 1
      const day = (densidadSelect.value.balance.fecha.substr(8,2))
      const fecha =  new Date(year, month, day)
      date.value = fecha
      balanceSelect.value = getBalanceByDate(format(fecha, 'yyyy-MM-dd'))
      densidad.id = densidadSelect.value.id
      densidad.densidad = densidadSelect.value.densidad
      densidad.balance_id = densidadSelect.value.balance.id
    }

    const formatPicker = () => {
      return format(date.value, 'dd-MM-yyyy')
    }

    const resetform = () => {
      Object.assign(densidad, initialFormData())
    }

    const handleSubmit = () => {
      if (!balanceSelect.value) {
        emit('ErrorData', 'No existe balance creado aún.')
      }
      const obj = {
        id: densidad.id,
        densidad: densidad.densidad,
        balance_id: balanceSelect.value.id,
      }
      console.log("🚀 ~ file: FormDictamen.vue:105 ~ handleSubmit ~ obj:", obj)
      context.emit('submitForm', obj)
      resetform()
    }

    const goBack = () => {
      router.go(-1)
    }

    watch(date, () => {
      console.log(date.value)
      const fecha = format(date.value, 'yyyy-MM-dd')
      balanceSelect.value = getBalanceByDate(fecha)
      console.log("🚀 ~ file: FormDensidad.vue:72 ~ watch ~ balanceSelect.value:", balanceSelect.value)
    })

    return {
      densidad,
      formatPicker,
      handleSubmit,
      balanceSelect,
      goBack,
      date,
    }
  }
}
</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="densidad" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="densidad.densidad"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Densidad</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <Datepicker class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="fecha" locale="es" :maxDate="new Date()" :format="formatPicker" autoApply v-model="date" :enableTimePicker="false"/>
        <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha</label>
    </div>
    <div class="flex items-center md:justify-end">
      <button type="button" class="text-dark bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2" @click="goBack">Cancelar</button>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2">Guardar</button>
    </div>
  </form>
</template>

