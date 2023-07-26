<script setup>
import { ref, reactive, computed, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useCompuesto from '../../compuestos/composables/compuestos'
import useProducto from '../composables/productos'

const { getProductoSelected } = useProducto()
const { fetchCompuestosAll, getCompuestos } = useCompuesto()
const router = useRouter()
const productSelect = computed(() => getProductoSelected())
const { emit } = useEventsBus()
const compuestos = computed(() => getCompuestos())
const isEditing = ref(false)
let compuestosSelected = ref([])

const initialFormData = () => ({
  descripcion: '',
  clave: '',
  compuestos: [],
  porcentajes: [],
})

const productoForm = reactive(initialFormData())

if (Object.keys(productSelect.value).length > 0) {
  console.log('Editar')
  isEditing.value = true
  productoForm.id = productSelect.value.id
  productoForm.descripcion = productSelect.value.descripcion
  productoForm.clave = productSelect.value.clave
  productoForm.compuestos = productSelect.value.compuestos
}


const resetform = () => {
  Object.assign(productoForm, initialFormData())
}

const handleSubmit = () => {
  const obj = {
    id: productoForm.id,
    descripcion: productoForm.descripcion,
    clave: productoForm.clave,
    compuestos: productoForm.compuestos,
  }
  emit('submitForm', obj)
  resetform()
}

const goBack = () => {
  router.go(-1)
}

watch(productoForm, (prod) => {
  prod.compuestos.forEach(comp => {
    if (!comp.porcentaje) {
      comp.porcentaje = 0
    }
  })
})

onMounted(() => {
  fetchCompuestosAll()
})

</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="nombre"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="productoForm.descripcion" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="usuario"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="productoForm.clave" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Clave</label>
    </div>
    <div class="flex flex-row flex-wrap items-stretch justify-stretch">
      <div class="flex items-center mx-2 mb-2" v-for="c in compuestos" :key="`compuesto_${c.id}`">
        <input 
          :id="`check_compuesto${c.id}`" 
          type="checkbox" 
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          :value="c"
          v-model="productoForm.compuestos"
        >
        <label 
          :for="`check_compuesto${c.id}`" 
          class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
        >
        {{ c.descripcion }}
        </label>
      </div>
    </div>
    <div v-if="productoForm.compuestos.length > 0" class="flex flex-col items-stretch mt-8 justify-stretch">
      <div class="relative z-0 w-full mb-6 group" v-for="(cs, index) in productoForm.compuestos" :key="`compuestoText_${index}`">
        <input type="number"
          class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " required v-model.number="cs.porcentaje" />
        <label :for="`compuestoText_${index}`"
          class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{`Porcentaje ${cs.descripcion}`}}</label>
      </div>
    </div>
    <div v-else class="flex flex-col items-stretch justify-stretch">
      No hay compuestos seleccionados
    </div>
    <div class="flex items-center md:justify-end">
      <button type="button"
      class="text-dark bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2"
      @click="goBack">Cancelar</button>
      <button type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2">Guardar</button>
    </div>
    
  </form>
</template>

