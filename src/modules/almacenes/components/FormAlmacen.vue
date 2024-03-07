<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import useAlmacenes from '../composables/almacenes'
import useEventsBus from '@/layout/eventBus'
import useCliente from '../../clientes/composables/cliente'

const { getSelectAlmacen } = useAlmacenes()
const { getClientes } = useCliente()

const router = useRouter()
const date = ref(new Date())
const almacenSelect = computed(() => getSelectAlmacen())
const clientes = computed(() => getClientes())
const { emit } = useEventsBus()

const initialFormData = () => ({
  id: '',
  cliente_id: null,
  cliente: null,
  inicio: 0,
  volumen: 0,
  fin: 0,
  fecha: format(date.value, 'yyyy-MM-dd'),

})

const clienteSelected = ref({})

const almacen = reactive(initialFormData())

const formatPicker = () => {
  return format(date.value, 'dd-MM-yyyy')
}

const resetform = () => {
  Object.assign(almacen, initialFormData())
}

const handleSubmit = () => {
  const obj = {
    id: almacen.id,
    cliente_id: almacen.cliente_id,
    cliente: almacen.cliente,
    inicio: almacen.inicio,
    volumen: almacen.volumen,
    fin: almacen.fin,
    fecha: almacen.fecha,
  }
  emit('submitForm', obj)
  resetform()
  
}

if (Object.keys(almacenSelect.value).length > 0) {
  console.log('Editar')
  const year = (almacenSelect.value.fecha.substr(0,4))
  const month = parseInt(almacenSelect.value.fecha.substr(5,2)) - 1
  const day = (almacenSelect.value.fecha.substr(8,2))
  const fecha =  new Date(year, month, day)
  date.value = fecha
  almacen.id = almacenSelect.value.id
  clienteSelected.value = clientes.value.find( (c) => c.id == almacenSelect.value.cliente_id)
  almacen.cliente = clienteSelected.value
  almacen.cliente_id = clienteSelected.value.id
  almacen.inicio = almacenSelect.value.inicio
  almacen.volumen = almacenSelect.value.volumen
  almacen.fin = almacenSelect.value.fin
  almacen.fecha = almacenSelect.value.fecha
}

const goBack = () => {
  router.go(-1)
}

watch(clienteSelected, () => {
  almacen.cliente = clienteSelected.value
  almacen.cliente_id = clienteSelected.value.id
})

watch(date, () => {
  almacen.fecha = date.value
})


</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <label for="clientes" class="block mb-2 text-sm font-medium text-gray-900">Cliente</label>
      <select id="clientes" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="clienteSelected">
        <option v-for="c in clientes" :key="c.id" :value="c">{{ c.nombreCliente }}</option>
      </select>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="inicio" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model.number="almacen.inicio"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Inicio</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="volumen" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model.number="almacen.volumen"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Volúmen</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="fin" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model.number="almacen.fin"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fin</label>
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
