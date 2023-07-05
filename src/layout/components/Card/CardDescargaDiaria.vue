<template>
  <div class="flex flex-col w-full p-1 m-1 bg-white border border-gray-200 rounded-lg shadow-md">
    <div class="flex items-center justify-center my-2">
      <h5 class="text-base font-bold text-dark">
        Reporte Diario
      </h5>
    </div>
    <div class="flex flex-row items-center justify-center w-full">
      <div class="flex flex-row items-center justify-start w-full mx-2 my-4">
        <span class="flex items-center justify-center mt-1 mb-1 mr-2 text-sm font-bold text-gray-400">
          Fecha:
        </span>
        <Datepicker v-model="date" locale="es" :maxDate="new Date()" :format="formatPickerInicial" :enableTimePicker="false" autoApply/>
        <button
          type="button"
          class="px-3 py-2 mx-2 text-xs font-medium text-center text-white rounded-lg bg-dark hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500"
          @click="obtenerJson"
        >
          Datos
        </button>
      </div>
      <div class="flex items-start justify-center w-full mx-4" v-show="showLink">
        <div class="flex items-center justify-center">
          <a :href="getRuta(archivoActual)" target="_blank" rel="noopener noreferrer">
            {{ archivoActual ? archivoActual.nombre : 'No existen archivos generados para este día.' }}
          </a>
          <IconDownload v-show="archivoActual" class="w-4 h-4 ml-2" fill="currentColor" />
        </div>
      </div>
      <div class="flex items-start justify-center w-full mx-4" v-show="!showLink">
        <span class="text-dark">No existen archivos generados para este día.</span>
      </div>
    </div>
    <div class="flex flex-row items-start justify-around w-7/12">
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format, subDays } from 'date-fns'
import useJson from '@/modules/json/composables/json'
import IconDownload from '@/assets/icons/cloud-arrow-down.svg'
import useBalance from '@/modules/balances/composables/balance';
import useBitacora from '../../../modules/bitacora/composables/index'


export default {
  components: { Datepicker, IconDownload },
  setup(props, context) {
    const date = ref(new Date())
    const hoy = ref(new Date())
    const { fetchJsonDiario, downloadJsonDiario, getUrl, actualizarInformacion } = useJson()
    
    const { filterFecha } = useBitacora()
    const { getBalanceByDate } = useBalance()
    const showLink = ref(false)
    const balanceSel = ref(null)
    const archivoActual = ref(null)
    
    /* const toast = useToast() */

    const obtenerJson = async ()  => {
      try {
        const res = await fetchJsonDiario(format(date.value, 'yyyy-MM-dd'))
        const { data, ok } = res
        if (ok) {
          balanceSel.value = getBalanceByDate(format(date.value, 'yyyy-MM-dd'))
          if (balanceSel.value) {
            const { archivos } = balanceSel.value
            archivoActual.value = archivos.find( (a) => a.estado == 1)
            showLink.value = balanceSel.value.archivos.length > 0
          }
          context.emit('fetchJson', data)
        } else {
          /* toast.error(`Error: ${data.data.descripcion1}`, {
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
            }) */
          showLink.value = false
        }
      } catch (error) {
        /* toast.error(`Error: ${error.message}`, {
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
        }) */
      }
    }

    const formatPickerInicial = () => {   
      estatusActualizacion()
      return format(date.value, 'dd-MM-yyyy')
    }

    const getRuta = (archivoActual) => {
      if (archivoActual) {
        return getUrl(archivoActual.ruta)
      } else {
        return 'No existe registro de archivos json generados.'
      }
    }

    const estatusActualizacion = async() =>{
      if(format(date.value, 'yyyy-MM-dd') === format(hoy.value, 'yyyy-MM-dd')){
        context.emit('infoActualizada', 'actual')
      }else{
        const actual = await actualizarInformacion(format(date.value, 'yyyy-MM-dd'))
        const { data } = actual
        context.emit('infoActualizada', actual.data.estatus)
      }
    }

    onMounted(()=>{
      filterFecha(format(date.value, 'yyyy-MM-dd'))
    })

    return {
      date,
      formatPickerInicial,
      obtenerJson,
      IconDownload,
      showLink,
      balanceSel,
      archivoActual,
      getRuta,
      estatusActualizacion,
    }
  }

}
</script>