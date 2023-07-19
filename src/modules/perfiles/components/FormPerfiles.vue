<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import usePerfil from '../composables'
import usePermiso from '../../permisos/composables'

const router = useRouter()
const { getPerfilesSelected } = usePerfil()
const { fetchPermisosAll, getPermisos } = usePermiso()
const perfilSelected = computed(() => getPerfilesSelected())
const { emit } = useEventsBus()
const permisos = computed(() => getPermisos())

const initialFormData = () => ({
  name: '',
  guard_name: 'web',
  permissions: [],
})

const perfilForm = reactive(initialFormData())

if (Object.keys(perfilSelected.value).length > 0) {
  const rol = perfiles.value.find(p => p.id === perfilSelected.value.roles[0])
  isEditing.value = true

  perfilForm.id = perfilSelected.value.id
  perfilForm.name = perfilSelected.value.nombre
  perfilForm.guard_name = perfilSelected.value.guard_name
  perfilForm.permissions = perfilSelected.value.permissions
}

const resetform = () => {
  Object.assign(perfilForm, initialFormData())
}
const handleSubmit = () => {
  const obj = {
    id: perfilForm.id,
    name: perfilForm.name,
    guard_name: perfilForm.guard_name,
    permissions: perfilForm.permissions,
  }
  console.log("🚀 ~ file: FormUsers.vue:51 ~ handleSubmit ~ obj:", obj)
  emit('submitForm', obj)
  resetform()
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  fetchPermisosAll()
})

</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="nombre"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="perfilForm.name" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre
        del Perfil</label>
    </div>
    <div class="flex flex-row flex-wrap items-stretch justify-stretch">
      <div class="flex items-center mx-2 mb-2" v-for="permiso in permisos" :key="`permiso_${permiso.id}`">
        <input 
          :id="`check_permiso_${permiso.id}`" 
          type="checkbox" 
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          :value="permiso.id"
          v-model="perfilForm.permissions"
        >
        <label 
          :for="`check_permiso_${permiso.id}`" 
          class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
        >
        {{ permiso.descripcion }}
        </label>
      </div>
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