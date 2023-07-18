<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useUsuario from '../composables'
import usePerfil from '@/modules/perfiles/composables'

const { getSelectedUsuario } = useUsuario()
const { fetchPerfiles, getPerfiles } = usePerfil()
const router = useRouter()
const userSelect = computed(() => getSelectedUsuario())
const { emit } = useEventsBus()
const disabled = ref(true)
const perfiles = computed(() => getPerfiles())

const initialFormData = () => ({
  nombre: '',
  usuario: '',
  contrasena: '',
  password_confirmated: '',
  correo: '',
  rol: null,
})

const usuarioForm = reactive(initialFormData())

if (Object.keys(userSelect.value).length > 0) {
  console.log('Editar')
  usuarioForm.id = userSelect.value.id
  usuarioForm.nombre = userSelect.value.nombre
  usuarioForm.usuario = userSelect.value.usuario
  usuarioForm.contrasena = userSelect.value.contrasena
  usuarioForm.correo = userSelect.value.correo
  usuarioForm.rol = userSelect.value.roles[0]
}


const resetform = () => {
  Object.assign(usuarioForm, initialFormData())
}

const handleSubmit = () => {
  const obj = {
    id: usuarioForm.id,
    nombre: usuarioForm.nombre,
    usuario: usuarioForm.usuario,
    correo: usuarioForm.correo,
    contrasena: usuarioForm.contrasena,
    contrasena_confirmation: usuarioForm.contrasena,
    rol: usuarioForm.rol
  }
  console.log("🚀 ~ file: FormUsers.vue:51 ~ handleSubmit ~ obj:", obj)
  emit('submitForm', obj)
  resetform()
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  fetchPerfiles()
})

</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="nombre"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="usuarioForm.nombre" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="usuario"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="usuarioForm.usuario" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Usuario</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="email" name="correo"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="usuarioForm.correo" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="password" name="usuario"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="usuarioForm.contrasena" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">contrasena</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="password" name="usuario"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="usuarioForm.password_confirmated" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar contrasena</label>
    </div>
    <div class="flex items-center md:justify-end">
      <label for="perfiles" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona un Perfil</label>
      <select required id="perfiles" class="bg-gray-50
          border border-gray-300
          text-dark text-base
          font-semibold
          rounded-lg
          focus:ring-black focus:border-dark
          block
          w-full
          p-2.5"
          v-model="usuarioForm.rol">
        <option v-for="perfil in perfiles" :key="perfil.id" :value="perfil.id">{{ perfil.name }}</option>
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

