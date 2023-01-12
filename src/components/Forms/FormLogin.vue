<template>
    <form class="w-3/5 md:w-4/12" @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="usuario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuario</label>
        <input type="text" id="usuario" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre de Usuario" required>
      </div>
      <div class="mb-6">
        <label for="pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
        <input type="password" id="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contraseña" required>
      </div>
      <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <span class="font-medium">Error!</span> {{ mensaje }}
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Iniciar Sesión</button>
      </div>
      <div class="flex justify-center items-center mt-6 text-center ">
        <router-link to="/password/recuperar">
          <p class="text-base underline underline-offset-2">Olvidé mi contraseña</p>
        </router-link>
      </div>
    </form>
</template>

<script>
    import { ref, reactive } from 'vue'
    import useAuth from '../../modules/auth/composables/auth'
    
    export default {
      setup(props, context) {
        return {}
      }
    }
</script>