<script>
import useDashboard from '../composables/useDashboard'
import { useRouter } from 'vue-router'
import useToast from "../../dashboard/composables/useToast"
import { ref, onMounted, reactive } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import useEventsBus from "../../../layout/eventBus"
import IconCheck from '@/assets/icons/check-solid.svg'
import IconDanger from '@/assets/icons/icon-exclamation.svg'
import CardDescargaDiaria from '@/layout/components/Card/CardDescargaDiaria.vue'
import CardDescargaMensual from '@/layout/components/Card/CardDescargaMensual.vue'
import useBalance from '@/modules/balances/composables/balance'
import useCliente from '../../clientes/composables/cliente'

export default {
  components: {
    IconCheck, IconDanger, CardDescargaDiaria, CardDescargaMensual,
},
  setup() {
    const router = useRouter()
    const { addToast } = useToast()
    const { emit } = useEventsBus()
    const { fetchBalances } = useBalance()
    const { fetchClientes } = useCliente()

    const { pause, resume, isActive } = useIntervalFn(() => {
      emit("reloadData", true)
    }, 100000)

    const actualizado = ref('actual')
    const empresa = reactive({
      nombre: 'Nombre Empresa',
      rfcContr: 'XXXX-XXXXXX-XXX',
      rfcRepre: 'XXXX-XXXXXX-XXX',
      tipoCaracter: 'Ducto',
      proovedor: 'xxxxx',
      claveInstalacion: 'ZZZZ-ZZZZ-ZZZ'
    })

    const showDiario = ref(true)

    let estatus = ref(false)

    const selectPeriodo = (periodo) => {
      showDiario.value = periodo === 'D'
    }

    const rellenarDataDiaria = (jsonData) => {
      console.log("🚀 ~ file: Dashboard.vue:44 ~ rellenarDataDiaria ~ jsonData:", jsonData)
    }

    const rellenarDataMensual = (jsonData) => {
      console.log("🚀 ~ file: Dashboard.vue:48 ~ rellenarDataMensual ~ jsonData:", jsonData)
    }
    const validarActual = (actualizada) => {
      actualizado.value = actualizada
      obtenerEstadoActual(actualizada)
    }

    const obtenerEstadoActual = (estado) => {
      if(estado == 'actual'){estatus = true}
    }


    onMounted(() => {
      fetchBalances()
      fetchClientes()
    })

    return {
      actualizado,
      showDiario,
      empresa,
      selectPeriodo,
      rellenarDataDiaria,
      rellenarDataMensual,
      validarActual,
    }
  },
}
</script>

<template>
  <div class="flex flex-col w-full m-2 sm:mr-12 sm:my-2">
    <div class="flex flex-col w-full m-1 bg-white border rounded-lg shadow-md border-slate-200 dark:border-slate-700">
      <div class="flex flex-row items-center w-full">
        <div class="w-full h-full grid grid-cols-[1fr] grid-rows-[1fr]">
          <div class="flex items-center justify-center">
            <h5 class="m-3 text-base font-bold text-dark">
              {{ empresa.nombre }}
            </h5>
          </div>
          <div class="w-full h-full grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] mx-14">
            <span class="mb-1 text-dark">RFC Contribuyente: {{ empresa.rfcContr }} </span>
            <span class="mb-1 text-dark">RFC Representante: {{ empresa.rfcRepre }}</span>
            <span class="mb-1 text-dark">Tipo caracter: {{ empresa.tipoCaracter }} </span>
            <span class="mb-1 text-dark">Proveedor: {{ empresa.proovedor }} </span>
            <span class="mb-1 text-dark">Clave instalación: {{ empresa.claveInstalacion }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-start w-6/12 mt-3 items-cen">
      <div v-if="actualizado == true" class="flex items-center justify-center mb-2 text-base font-bold text-dark" role="alert">
        <IconCheck class="w-4 h-4 ml-2 mr-5" fill="currentColor" />
        Información Experion actualizada
      </div>
      <div v-if="actualizado == false" class="flex items-center justify-center mb-2 text-base font-bold text-red-700" role="alert">
        <IconDanger class="w-4 h-4 ml-2 mr-5" fill="currentColor" />
        Información Experion desincronizada
      </div>
      <div v-if="actualizado == 'actual'" class="flex items-center justify-center mb-2 text-base font-bold text-blue-700" role="alert">
        <IconDanger class="w-4 h-4 ml-2 mr-5" fill="currentColor" />
        La información de jornada aún no ha sido procesada.
      </div>
    </div>
    <div class="text-sm font-medium text-center text-gray-500 border-b border-slate-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap ml-5 xl:ml-11">
        <li>
          <button @click="selectPeriodo('D')" v-tippy="{ content: 'Mostrar Balance Diario' }" type="button"
            class="flex items-center justify-center w-16 h-10 m-2 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-green-500 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none"
            :class="showDiario ? 'border-gray-500' : 'border-blue-500'"
            >
            Diario
          </button>
        </li>
        <li>
          <button @click="selectPeriodo('M')" v-tippy="{ content: 'Mostrar Balance Mensual' }" type="button"
            class="flex items-center justify-center w-16 h-10 m-2 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-green-500 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none"
            :class="!showDiario ? 'border-gray-500' : 'border-blue-500'"
            >
            Mensual
          </button>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-start my-4">
      <div v-show="showDiario" class="flex items-center justify-center mx-4 w-5/5 md:min-w-max lg:5/12 xl:ml-10">
        <CardDescargaDiaria @fetchJson="rellenarDataDiaria" @infoActualizada="validarActual"/>
      </div>
      <div v-show="!showDiario" class="flex items-center justify-center mx-4 w-5/5 md:min-w-max lg:5/12 xl:ml-10">
        <CardDescargaMensual @fetchJson="rellenarDataMensual" />
      </div>
    </div>
  </div>
</template>

