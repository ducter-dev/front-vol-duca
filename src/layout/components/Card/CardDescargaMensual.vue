<template>
  <div class="flex flex-col w-full p-1 m-1 bg-white border border-gray-200 rounded-lg shadow-md">
    <div class="flex items-center justify-center my-2">
      <h5 class="text-base font-bold text-dark">
        Reporte Mensual
      </h5>
    </div>
    <div class="flex flex-row items-center justify-center w-full">
      <div class="flex flex-row items-center justify-start w-full mx-2 my-4">
        <span class="flex items-center justify-center mt-1 mb-1 mr-2 text-sm font-bold text-gray-400">
          Fecha:
        </span> 
        <Datepicker v-model="date" monthPicker locale="es" :enableTimePicker="false" autoApply/>
      </div>
      <div class="flex flex-col items-center justify-center w-3/12 my-4">
        <button
          type="button"
          class="px-3 py-2 text-xs font-medium text-center text-white rounded-lg bg-dark hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500"
          @click="obtenerJson"
        >
          Datos
        </button>
      </div>
      <div v-show="showButton" class="flex flex-col items-center justify-center w-3/12 my-4">
        <button
          type="button"
          class="text-white bg-dark hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
          @click="download"
        >
          <IconDownload class="w-4 h-4" fill="currentColor" />
        </button>
      </div>
    </div>
    <div class="flex flex-row items-start justify-around">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format, startOfMonth, lastDayOfMonth } from 'date-fns'
import useJson from '@/modules/json/composables/json'
import IconDownload from '@/assets/icons/cloud-arrow-down.svg'
/* import { useToast } from 'vue-toastification' */

export default {
  components: { Datepicker, IconDownload },
  setup(props, context) {
    const date = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    })
    
    const showButton = ref(false)
    const { fetchJsonMensual, downloadJsonMensual } = useJson()

    const obtenerJson = async ()  => {
      const monthstr =  new Date(date.value.year,date.value.month)
      const fechaInicio = format(startOfMonth(monthstr), 'yyyy-MM-dd')
      const fechaFin = format(lastDayOfMonth(monthstr), 'yyyy-MM-dd')
      const res = await fetchJsonMensual(fechaInicio, fechaFin)
      const { data, ok } = res
      if (ok) {
        showButton.value = true
        context.emit('fetchJson', data)
      }else {
        /* toast.error(`Error: ${data.error}`, {
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
        showButton.value = false
      }
    }

    const download = async() => {
      try {
        const monthstr =  new Date(date.value.year,date.value.month)
        const fechaInicio = format(startOfMonth(monthstr), 'yyyy-MM-dd')
        const fechaFin = format(lastDayOfMonth(monthstr), 'yyyy-MM-dd')
        const {ok, data } = await downloadJsonMensual(fechaInicio, fechaFin)
        if (ok) {
          window.open(data, '_blank')
        } else {
          /* toast.error(`Error: ${data}`, {
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
      } catch (error) {
        console.log(error)
      }
    }

    return {
      date,
      obtenerJson,
      download,
      IconDownload,
      showButton,
    }
  }

}
</script>