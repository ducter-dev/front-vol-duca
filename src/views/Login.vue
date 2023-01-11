<template>
    <div class="container mx-auto h-full flex flex-col justify-center items-center">
      <div class="w-full flex justify-center items-center mb-10">
        <div class="justify-center items-center">
          <img class="w-96" :src="LogoTermigas" alt="Logo Termigas">
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <form class="w-3/12">
          <div class="mb-6">
            <label for="usuario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuario</label>
            <input type="text" id="usuario" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre de Usuario" required>
          </div>
          <div class="mb-6">
            <label for="pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
            <input type="password" id="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contraseña" required>
          </div>
          <div class="flex justify-center items-center">
            <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
  <script setup>
  import LogoTermigas from '../assets/logo.png'
  </script>