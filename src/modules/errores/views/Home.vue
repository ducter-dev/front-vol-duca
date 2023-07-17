<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import useEventsBus from "../../../layout/eventBus"
import useToast from "../../dashboard/composables/useToast"
import useError from '../composables/useErrores'

import Paginate from '@/layout/components/Paginate/Index.vue'

/* Declaración de atributos asignables */
let errores = ref([])
let loading = ref(false)
const { fetchErrores } = useError() 
const { addToast } = useToast()

const links = ref([])
const meta = ref([])
let pagination = reactive({
  current_page: 1
})

/* Declaración de métodos */
const setDataFromResult = (data) => {
  if (data.length == 0) {
    addToast({
      message: {
        title: "Error!",
        message: "No existen registros con esa fecha.",
        type: "error"
      },
    })
  }
  errores.value = data
  loading.value = false
}


const fetchDataErrores = async () => {
  try {
    console.log(3)
    loading.value = true
    const params = { page: pagination.current_page}
    const res = await fetchErrores(params)
    const { data, status, message, paginacion } = res
    /* console.log("🚀 ~ file: Home.vue:71 ~ fetchDataErrores ~ paginacion:", paginacion) */

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 200) {
      setDataFromResult(data)
      links.value = paginacion.links
      meta.value = paginacion.meta
      pagination = paginacion.meta
      
    } else {
      loading.value = false
      addToast({
        message: {
          title: "¡Error!",
          message: message,
          type: "error"
        },
      })
    }
  } catch (error) {
    // En caso de tener error establece un mensaje de error
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error}`,
        type: "error"
      },
    })
  }
}

const goToInsert = () => {
  router.push({ name: 'errores.create'})
}

const setDescripcion = (error) => {
  return `${error.descripcion1} ${error.descripcion2} ${error.descripcion3}`
}

onMounted(() => {
  fetchDataErrores()
})

</script>


<template>
  <div class="flex flex-col w-full m-2 sm:mr-12 sm:my-2">
    <div class="py-3 space-y-3 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
      <h2
        class="py-1 text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate"
      >
        Errores
      </h2>
    </div>
  </div>
  <div class="mt-5 space-y-5">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="border border-solid border-slate-300">
            <div class="flex items-center justify-between">
              <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Lista de densidades
              </legend>
            </div>
            <LTable :loader="loading">
              <template #head>
                <tr>
                  <LHeaderTh value="Consecutivo" center />
                  <LHeaderTh value="Fecha" center />
                  <LHeaderTh value="Descripción" center />
                </tr>
              </template>
              <template #body>
                <tr v-for="(item, index) in errores" v-if="errores.length > 0" :key="item.id">
                  <LBodyTh :value="index + 1" center />
                  <LBodyTd :value="item.fecha" center />
                  <LBodyTd :value="setDescripcion(item)" center />
                </tr>
                <tr v-else>
                  <LBodyTh value="Sin información" colspan="7" center />
                </tr>
              </template>
            </LTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Paginate 
    v-if="pagination.last_page > 1"
    :pagination="pagination"
    :offset="7"
    @changePaginate="fetchDataErrores()" />
</template>