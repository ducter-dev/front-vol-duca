<template>
    <div class="container mx-auto h-full flex flex-col justify-center items-center">
      <div class="w-full flex justify-center items-center mb-10">
        <div class="justify-center items-center">
          <img class="w-65 md:w-100" alt="Logo Termigas">
          <div class="flex justify-center items-center">
            <p class="font-bold text-lg text-dark">Recuperar Contraseña</p>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <FormRecuperarPassword />
      </div>
    </div>
</template>
  
<script>
  import LogoTermigas from '../assets/logo.png'
  import FormRecuperarPassword from '../components/Forms/FormRecuperarPassword.vue'
  
  export default {
    components: { LogoTermigas, FormRecuperarPassword },
    setup() {
      return {
        LogoTermigas,
      }
    }
  }
</script>