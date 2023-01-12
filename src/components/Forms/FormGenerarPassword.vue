<template>
    <form class="w-3/12" @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
        <input type="password" id="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contraseña" required>
      </div>
      <div class="mb-6">
        <label for="pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirmar Contraseña</label>
        <input type="password" id="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirmar" required>
      </div>
      <div class="flex justify-center items-center text-gray-500 mb-6">
        <h2>Reglas de contraseñas: Debe contener un número, una letra mayúscula, un símbolo, y mínimo 8 carácteres.</h2>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Confirmar</button>
      </div>
    </form>
</template> 

<script>
import { ref, watch, reactive } from 'vue'
import useAuth from '../../modules/auth/composables/auth'
import { useRouter } from 'vue-router'

export default({
    setup() { },
})
</script>

  