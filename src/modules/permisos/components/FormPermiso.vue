<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import usePermiso from '../../permisos/composables'

const router = useRouter()
const { getPermisosSelected } = usePermiso()
const permisoSelected = computed(() => getPermisosSelected())
const { emit } = useEventsBus()

const initialFormData = () => ({
  name: '',
  guard_name: 'web',
  description: ''
})

const permisoForm = reactive(initialFormData())

if (Object.keys(permisoSelected.value).length > 0) {
  permisoForm.id = permisoSelected.value.id
  permisoForm.name = permisoSelected.value.nombre
  permisoForm.guard_name = permisoSelected.value.guard_name
  permisoForm.description = permisoSelected.value.descripcion
}

const resetform = () => {
  Object.assign(permisoForm, initialFormData())
}
const handleSubmit = () => {
  const obj = {
    id: permisoForm.id,
    name: permisoForm.name,
    guard_name: permisoForm.guard_name,
    description: permisoForm.description,
  }
  console.log("🚀 ~ file: FormUsers.vue:51 ~ handleSubmit ~ obj:", obj)
  emit('submitForm', obj)
  resetform()
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="nombre"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="permisoForm.name" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre
        del Permiso</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="descripcion"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="permisoForm.description" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descipción</label>
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