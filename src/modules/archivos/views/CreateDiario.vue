<template>
  <div class="flex flex-col w-full m-2 sm:mx-12 sm:my-2">
    <div class="flex flex-row items-center justify-start mt-5 ml-5 sm:ml-0">
      <div class="flex items-center justify-center mr-2">
        <h2 class="flex items-center justify-center mr-2 text-xl font-bold text-dark">Nuevo archivo</h2>
      </div>
        <button
          type="button"
          class="inline-flex items-center p-2 text-sm font-medium text-center border rounded-full text-dark border-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300" @click="goBack"
        >
          <IconLeft class="w-4 h-4" fill="currentColor" />
        </button>
    </div>
    <div class="flex flex-row items-center justify-center w-full">
      <div class="flex flex-row items-center justify-start w-full mx-2 my-4">
        <div class="flex justify-center mx-2">
          <span class="flex items-center justify-center mt-1 mb-1 mr-2 text-sm font-bold text-gray-400">
            Fecha:
          </span>
          <Datepicker v-model="date" locale="es" :maxDate="new Date()" cancelText="Cancelar" selectText="Seleccionar"
            placeholder="Seleccione una fecha" :enableTimePicker="false" :format="formatPicker" autoApply
            :clearable="false" />
        </div>
        <div class="flex justify-center mx-2">
          <button
            type="button"
            class="px-3 py-2 text-xs font-medium text-center text-white rounded-lg bg-dark hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500"
            @click="crearJson"
          >
            Generar Archivo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import IconLeft from '@/assets/icons/caretLeft.svg'
import useToast from "../../dashboard/composables/useToast"
import useArchivo from '../composables/archivos'
import { format } from 'date-fns'
import useEmpresa from '../../empresas/composables/empresa'

export default {
  components: { IconLeft },
  setup() {
    const router = useRouter()
    const { insertArchivo } = useArchivo()
    const { getCurrentEmpresa } = useEmpresa()
    const { addToast } = useToast()
    const date = ref(new Date())

    const empresa = computed(() => getCurrentEmpresa())

    const goBack = () => {
      router.go(-1)
    }

    const formatPicker = () => {   
      return format(date.value, 'dd-MM-yyyy')
    }

    const crearJson = async ()  => {
      try {
        const form = {
          idEmpresa: empresa.value.id,
          fechaBalance: format(date.value, 'yyyy-MM-dd'),
          tipo: "export",
          unidad: "litros"
        }
        const res = await insertArchivo(form)
        const { ok } = res
        if (ok) {
          addToast({
            message: {
              title: "Éxito!",
              message: "El archivo ha sido generado exitosamente",
              type: "success"
            },
          })
          router.push('/archivos')
        } else{
          
          addToast.error(`${res.data.error}`, {
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
      } catch (error) {
        
        addToast({
          message: {
            title: "¡Error!",
            message: message,
            type: "error",
            component: "createDiario - onSubmit()"
          },
        })
      }
    }
    
    return {
      crearJson,
      IconLeft,
      goBack,
      date,
      formatPicker,
    }
  }
}
</script>