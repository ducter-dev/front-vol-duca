<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import usePrestamo from '../composables/prestamo'
import useEventsBus from '@/layout/eventBus'
import useCliente from '../../clientes/composables/cliente'

const { getSelectPrestamo } = usePrestamo()
const { getClientes } = useCliente()

const router = useRouter()
const date = ref(new Date())
const prestamoSelect = computed(() => getSelectPrestamo())
const clientes = computed(() => getClientes())
const { emit } = useEventsBus()

const initialFormData = () => ({
  id: '',
  cliente_id_c: null,
  cliente_compra: {},
  cliente_id_v: null,
  cliente_venta: {},
  cantidad: 0,
  fecha: format(date.value, 'yyyy-MM-dd'),

})

const clienteSelectedC = ref({})
const clienteSelectedV = ref({})

const prestamo = reactive(initialFormData())

const formatPicker = () => {
  return format(date.value, 'dd-MM-yyyy')
}

const resetform = () => {
  Object.assign(prestamo, initialFormData())
}

const handleSubmit = () => {
  const obj = {
    id: prestamo.id,
    cliente_id_c: prestamo.cliente_id_c,
    cliente_compra: prestamo.cliente_compra,
    cliente_id_v: prestamo.cliente_id_v,
    cliente_venta: prestamo.cliente_venta,
    cantidad: prestamo.cantidad,
    fecha: prestamo.fecha,
  }
  emit('submitForm', obj)
  resetform()
  
}
if (Object.keys(prestamoSelect.value).length > 0) {
  console.log('Editar')
  const year = (prestamoSelect.value.balance.fecha.substr(0,4))
  const month = parseInt(prestamoSelect.value.balance.fecha.substr(5,2)) - 1
  const day = (prestamoSelect.value.balance.fecha.substr(8,2))
  const fecha =  new Date(year, month, day)
  date.value = fecha
  prestamo.id = prestamoSelect.value.id
  prestamo.cliente_id_c = prestamoSelect.cliente_id_c
  prestamo.cliente_compra = prestamoSelect.cliente_compra
  prestamo.cliente_id_v = prestamoSelect.cliente_id_v
  prestamo.cliente_venta = prestamoSelect.cliente_venta
  prestamo.cantidad = prestamoSelect.cantidad
  prestamo.fecha = prestamoSelect.fecha
}

const goBack = () => {
  router.go(-1)
}

watch(clienteSelectedC, () => {
  prestamo.cliente_compra = clienteSelectedC.value
  prestamo.cliente_id_c = clienteSelectedC.value.id
})

watch(clienteSelectedV, () => {
  prestamo.cliente_venta = clienteSelectedV.value
  prestamo.cliente_id_v = clienteSelectedV.value.id
})

watch(date, () => {
  prestamo.fecha = date.value
})


</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <label for="clientes_v" class="block mb-2 text-sm font-medium text-gray-900">Cliente Vende</label>
      <select id="clientes_v" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="clienteSelectedV">
        <option v-for="c in clientes" :key="c.id" :value="c">{{ c.nombreCliente }}</option>
      </select>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <label for="clientes_c" class="block mb-2 text-sm font-medium text-gray-900">Cliente Compra</label>
      <select id="clientes_c" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="clienteSelectedC">
        <option v-for="c in clientes" :key="c.id" :value="c">{{ c.nombreCliente }}</option>
      </select>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="densidad" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model.number="prestamo.cantidad"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
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

