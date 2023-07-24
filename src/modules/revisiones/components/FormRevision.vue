<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import useEventsBus from "@/layout/eventBus"
import useRevision from '../composables'

const { getRevisionSelected } = useRevision()
const revSelect = computed(() => getRevisionSelected())

const router = useRouter()
const dateInicio = ref(new Date())
const dateFin = ref(new Date())
const { emit } = useEventsBus()

const initialFormData = () => ({
  descripcion: '',
  inicio: dateInicio.value,
  periodo: 0,
  proxima: dateFin.value,
  estado: 1,
})

const revision = reactive(initialFormData())

if (Object.keys(revSelect.value).length > 0) {
  console.log("🚀 ~ file: FormRevision.vue:27 ~ revSelect.value:", revSelect.value)
  console.log('Editar')
  
  const yearI = (revSelect.value.inicio.substr(0,4))
  const monthI = parseInt(revSelect.value.inicio.substr(5,2)) - 1
  const dayI = (revSelect.value.inicio.substr(8,2))
  const horaI = (revSelect.value.inicio.substr(11,2))
  console.log("🚀 ~ file: FormRevision.vue:34 ~ horaI:", horaI)
  const minI = (revSelect.value.inicio.substr(14,2))
  console.log("🚀 ~ file: FormRevision.vue:36 ~ minI:", minI)
  const fechaInicio =  new Date(yearI, monthI, dayI, horaI, minI)
  console.log("🚀 ~ file: FormRevision.vue:36 ~ fechaInicio:", fechaInicio)
  const yearE = (revSelect.value.proxima.substr(0,4))
  const monthE = parseInt(revSelect.value.proxima.substr(5,2)) - 1
  const dayE = (revSelect.value.proxima.substr(8,2))
  const horaE = (revSelect.value.proxima.substr(11,2))
  const minE = (revSelect.value.proxima.substr(14,2))
  const fechaProxima =  new Date(yearE, monthE, dayE, horaE, minE)
  console.log("🚀 ~ file: FormRevision.vue:43 ~ fechaProxima:", fechaProxima)
  revision.id = revSelect.value.id
  revision.descripcion = revSelect.value.descripcion
  revision.inicio = fechaInicio
  revision.periodo = revSelect.value.periodo
  revision.proxima = fechaProxima
  revision.estado = revSelect.value.estado
}

const formatPickerInicio = () => {
  return format(revision.inicio, 'dd-MM-yyyy HH:mm')
}

const formatPickerFin = () => {
  return format(revision.proxima, 'dd-MM-yyyy HH:mm')
}

const resetform = () => {
  Object.assign(revision, initialFormData())
}

const handleSubmit = () => {
  const obj = {
    id: revision.id,
    descripcion: revision.descripcion,
    inicio: format(revision.inicio, 'yyyy-MM-dd HH:mm:ss'),
    periodo: revision.periodo,
    proxima: format(revision.proxima, 'yyyy-MM-dd HH:mm:ss'),
    estado: revision.estado,
  }
  console.log("🚀 ~ file: FormDictamen.vue:105 ~ handleSubmit ~ obj:", obj)
  emit('submitForm', obj)
  resetform()
}

const goBack = () => {
  router.go(-1)
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
      <input type="text" name="name" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="revision.descripcion"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <Datepicker class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="fechaHoraCorte" locale="es" :maxDate="new Date()" :format="formatPickerInicio" autoApply v-model="revision.inicio" time-picker-inline />
        <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Inicio</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="name" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required v-model="revision.periodo"/>
      <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Periodo</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <Datepicker class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="fechaHoraCorte" locale="es" :format="formatPickerFin" autoApply v-model="revision.proxima" time-picker-inline/>
        <label class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Próxima</label>
    </div>
    <div class="flex items-center md:justify-end">
      <button type="button" class="text-dark bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2" @click="goBack">Cancelar</button>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2">Guardar</button>
    </div>
  </form>
</template>

