<template>
    <form class="w-3/5 md:w-4/12" @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="correo" class="block mb-2 text-sm font-medium text-dark" >Email</label>
        <input v-model="correo" type="email" id="correo" class="bg-gray-50 border text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ingresar Email" required>
      </div>
      <div class="w-full flex justify-items-center justify-end items-center">
        <button type="submit" class="w-full text-white bg-dark hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Confirmar</button>
      </div>
    </form>
  </template> 
  
  <script>
  
  import { ref, watch } from 'vue'
  
  export default {
    setup( props, context) {
  
      return {}
    }
  }
  </script>