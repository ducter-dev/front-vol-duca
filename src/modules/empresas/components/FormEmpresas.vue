<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useEmpresa from '../composables/empresa'
import useProducto from '../../productos/composables/productos'


const router = useRouter()
const { getEmpresasSelected } = useEmpresa()
const { fetchProductosAll, getProductos } = useProducto()
const empresaSelected = computed(() => getEmpresasSelected())
const { emit } = useEventsBus()
const productos = computed( () => getProductos())

const initialFormData = () => ({
  rfcCliente: '',
  nombreCliente: '',
})

const empresaForm = reactive(initialFormData())

if (Object.keys(empresaSelected.value).length > 0) {
  empresaForm.id = empresaSelected.value.id
  empresaForm.descripcion = empresaSelected.value.descripcion
  empresaForm.version = empresaSelected.value.version
  empresaForm.rfc_contribuyente = empresaSelected.value.rfc_contribuyente
  empresaForm.rfc_representante = empresaSelected.value.rfc_representante
  empresaForm.proveedor = empresaSelected.value.proveedor
  empresaForm.tipo_caracter = empresaSelected.value.tipo_caracter
  empresaForm.modalidad_permiso = empresaSelected.value.modalidad_permiso
  empresaForm.num_permiso = empresaSelected.value.num_permiso
  empresaForm.clave_instalacion = empresaSelected.value.clave_instalacion
  empresaForm.descripcion_instalacion = empresaSelected.value.descripcion_instalacion
  empresaForm.geolocalizacion_latitud = empresaSelected.value.geolocalizacion_latitud
  empresaForm.geolocalizacion_longitud = empresaSelected.value.geolocalizacion_longitud
  empresaForm.numero_tanques = empresaSelected.value.numero_tanques
  empresaForm.numero_ductos_entradas_salidas = empresaSelected.value.numero_ductos_entradas_salidas
  empresaForm.numero_ductos_distribucion = empresaSelected.value.numero_ductos_distribucion
  empresaForm.fecha_hora_corte = empresaSelected.value.fecha_hora_corte
  empresaForm.producto_omision = empresaSelected.value.producto_omision
  empresaForm.producto = empresaSelected.value.producto
}

const resetform = () => {
  Object.assign(empresaForm, initialFormData())
}
const handleSubmit = () => {
  const obj = {
    id: empresaForm.id,
    descripcion: empresaForm.descripcion,
    version: empresaForm.version,
    rfc_contribuyente: empresaForm.rfc_contribuyente,
    rfc_representante: empresaForm.rfc_representante,
    proveedor: empresaForm.proveedor,
    tipo_caracter: empresaForm.tipo_caracter,
    modalidad_permiso: empresaForm.modalidad_permiso,
    num_permiso: empresaForm.num_permiso,
    clave_instalacion: empresaForm.clave_instalacion,
    descripcion_instalacion: empresaForm.descripcion_instalacion,
    geolocalizacion_latitud: empresaForm.geolocalizacion_latitud,
    geolocalizacion_longitud: empresaForm.geolocalizacion_longitud,
    numero_tanques: empresaForm.numero_tanques,
    numero_ductos_entradas_salidas: empresaForm.numero_ductos_entradas_salidas,
    numero_ductos_distribucion: empresaForm.numero_ductos_distribucion,
    fecha_hora_corte: empresaForm.fecha_hora_corte,
    producto_omision: empresaForm.producto_omision,
    producto: empresaForm.producto
  }
  emit('submitForm', obj)
  resetform()
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  fetchProductosAll()
})

</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="descripcion"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.descripcion" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="versión"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.version" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Versión</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="rfc_contibuyente"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.rfc_contribuyente" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        RFC Contribuyente
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="rfc_representante"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.rfc_representante" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        RFC Representante
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="proveedor"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.proveedor" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Proveedor
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="rfc_representante"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.rfc_representante" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        RFC Representante
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="tipo_caracter"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.tipo_caracter" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Tipo Caracter
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="modalidad_permiso"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.modalidad_permiso" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Modalidad Permiso
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="num_permiso"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.num_permiso" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Número Permiso
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="clave_instalacion"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.clave_instalacion" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Clave Instalación
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="descripcion_instalacion"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.descripcion_instalacion" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Descripción Instalación
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="geolocalizacion_latitud"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.geolocalizacion_latitud" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Geoloalización Latitud
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="geolocalizacion_longitud"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.geolocalizacion_longitud" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Geoloalización Longitud
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="number" name="numero_tanques"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.numero_tanques" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Número de Tanques
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="number" name="numero_ductos_entradas_salidas"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.numero_ductos_entradas_salidas" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Número de Entradas - Salidas
      </label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="number" name="numero_ductos_distribucion"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="empresaForm.numero_ductos_distribucion" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Número de Ductos Distribución
      </label>
    </div>
    <div class="flex items-center md:justify-end">
      <label for="productos" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona un Producto</label>
      <select required id="productos" class="bg-gray-50
          border border-gray-300
          text-dark text-base
          font-semibold
          rounded-lg
          focus:ring-black focus:border-dark
          block
          w-full
          p-2.5"
          v-model="empresaForm.producto">
        <option v-for="p in productos" :key="p.id" :value="p">{{ p.descripcion }}</option>
      </select>
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