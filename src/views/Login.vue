<template>
    <div class="container mx-auto h-full flex flex-col justify-center items-center">
      <div class="w-full flex justify-center items-center mb-10">
        <div class="justify-center items-center">
          <img class="w-96" :src="LogoTermigas" alt="Logo Termigas">
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <FormLogin/>
      </div>
    </div>
</template>
  
<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import LogoTermigas from '../assets/logo.png'
  import FormLogin from '../components/Forms/FormLogin.vue'
  export default {
    components: {LogoTermigas, FormLogin},
    setup () {
      return {
        LogoTermigas,
        FormLogin,
      }
    } 
  }
</script>

<style>
	#preloader{
	background: rgb(255, 255, 255) url(../assets/loading-81.gif) no-repeat center center;
	height: 100vh;
	width: 100%;
	position: fixed;
	z-index: 100;
	}
</style>