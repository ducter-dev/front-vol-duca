<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <div class="flex flex-row justify-start items-center mt-5 ml-5 sm:ml-0">
      <div class="flex justify-center items-center mr-2">
        <h2 class="flex justify-center items-center text-xl font-bold text-dark mr-2">Nueva Empresa</h2>
      </div>
        <button
          type="button"
          class="
            text-dark
            border border-dark
            hover:bg-dark hover:text-white
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-full
            text-sm
            p-2
            text-center
            inline-flex
            items-center
          " @click="goBack"
        >
          <IconLeft class="w-4 h-4" fill="currentColor" />
        </button>
    </div>
    <div class="flex justify-center items-center my-4 mb-16">
      <FormEmpresa :empresaSelect="empresa" @submitForm="agregarEmpresa" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useEmpresa from '../../empresas/composables/empresa'
import IconLeft from '@/assets/icons/caretLeft.svg'
import FormEmpresa from '../../../components/Forms/FormEmpresa.vue'
import { useToast } from 'vue-toastification'

export default {
  components: { IconLeft, FormEmpresa },
  setup() {
    const router = useRouter()
    const { insertEmpresa } = useEmpresa()
    const toast = useToast()

    const goBack = () => {
      router.go(-1)
    }

    const agregarEmpresa = async(empresa) => {
      try {
        const {ok, data, detail } = await insertEmpresa(empresa)
        if (ok) {
          toast.success(`Empresa ingresada correctamente.`, {
            position: "bottom-right",
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          })
          router.push('/configuracion/empresas')
        } else {
          detail.errors.forEach(error => {
            toast.error(error, {
              position: "bottom-right",
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false
            })
          })
        }
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-right",
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        })
      }  
    }

    return {
      agregarEmpresa,
      IconLeft,
      goBack,
    }
  }
}
</script>