<template>
  <div class="flex flex-col w-full m-2 sm:mx-12 sm:my-2">
    <div class="flex flex-row items-center justify-start mt-5 ml-5 md:ml-0">
      <div class="flex items-center justify-center mr-2">
        <h2 class="flex items-center justify-center mr-2 text-xl font-bold text-dark">Editar Empresa</h2>
      </div>
        <button
          type="button"
          class="inline-flex items-center p-2 text-sm font-medium text-center border rounded-full  text-dark border-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300" @click="goBack"
        >
          <IconLeft class="w-4 h-4" fill="currentColor" />
        </button>
    </div>
    <div class="flex items-center justify-center mb-16 my-7 md:my-4">
      <FormEmpresa :empresaSelect="empresa" @submitForm="editarEmpresa"/>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useEmpresa from '../composables/empresa'
import IconLeft from '@/assets/icons/caretLeft.svg'
import FormEmpresa from '../../../components/Forms/FormEmpresa.vue'
import { useToast } from 'vue-toastification'

export default {
  components: { IconLeft, FormEmpresa },
  setup() {
    const router = useRouter()
    const { updateEmpresa } = useEmpresa()
    const toast = useToast()

    const goBack = () => {
      router.go(-1)
    }

    const editarEmpresa = async(empresa) => {
      try {
        const {ok, data, detail } = await updateEmpresa(empresa)
        if (ok) {
          toast.success(`Empresa actualizada correctamente.`, {
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
      editarEmpresa,
      IconLeft,
      goBack,
    }
  }
}
</script>