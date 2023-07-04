<template>
    <div class="container flex flex-col items-center justify-center h-full mx-auto">
      <div class="flex items-center justify-center w-full mb-10">
        <div class="items-center justify-center">
          <img class="w-65 md:w-100" alt="Logo Termigas">
          <div class="flex items-center justify-center">
            <p class="text-lg font-bold text-dark">Recuperar Contraseña</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center w-full">
        <FormRecuperarPassword />
      </div>
    </div>
</template>
  
<script>
  import LogoTermigas from '../../../assets/logo.png'
  import FormRecuperarPassword from '../../../components/Forms/FormRecuperarPassword.vue'
  
  export default {
    components: { LogoTermigas, FormRecuperarPassword },
    setup() {
      return {
        LogoTermigas,
      }
    }
  }
</script>