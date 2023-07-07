<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from '@headlessui/vue'

import EditIcon from "@/assets/icons/pencil.svg"
import RefreshIcon from "@/assets/icons/refresh.svg"
import DeleteDictamen from './Delete.vue'
import useEventsBus from "../../../layout/eventBus"
import useToast from "../../dashboard/composables/useToast"
import useDictamen from '../composables/dictamen'
import IconPlus from '@/assets/icons/plus-solid.svg'
import Paginate from '@/layout/components/Paginate/Index.vue'
import useBalance from '@/modules/balances/composables/balance';

/* Declaración de atributos asignables */

const { bus } = useEventsBus()
const { getDictamenes, selectDictamen, setPaginacion, fetchDictamenesLink } = useDictamen()
const { fetchBalances } = useBalance()
const dictamenesList = computed(() => getDictamenes())
const { addToast } = useToast()
const date = ref(new Date())
const router = useRouter()
const dateFormated = computed(() => format(date.value, 'yyyy-MM-dd'))

let dictamenes = ref([])
let loading = ref(false)

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
  dictamenes.value = data
  loading.value = false
}

/**
 *  Función que consulta `fetchDataDictamenes`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */

const fetchDataDictamenes = async () => {
  try {
    loading.value = true
    const params = { page: pagination.current_page}
    const res = await fetchDictamenesLink(params)
    const { data, status, message, paginacion } = res
    /* console.log("🚀 ~ file: Home.vue:71 ~ fetchDataDictamenes ~ paginacion:", paginacion) */

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
  router.push({ name: 'dictamenes.create'})
}

const goToEdit = (dictamen) => {
  selectDictamen(dictamen)
  router.push({ name: 'dictamenes.edit'})
}

const formatPicker = () => {
  return format(date.value, 'dd-MM-yyyy')
}

const obtenerDictamenesLink = async() => {
  try {
    const params = { page: pagination.current_page}
    const res = await fetchDictamenesLink(params)
    const { data, status, message, paginacion } = res
    if (status == 200) {
      setDataFromResult(data)
      links.value = paginacion.meta.links
      meta.value = paginacion.meta
      pagination = paginacion.meta
      
      setPaginacion(pagination)
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
    console.log(error)
  }
}

const selectLink = (link) => {
  console.log("🚀 ~ file: Home.vue:179 ~ selectLink ~ link:", link)
  obtenerDictamenesLink(link)
}

/* watch(() => bus.value.get('successRegistrationDictamen'), (val) => {
  fetchDataDictamenes()
}) */

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var tanksList sera asignado,
 *  en caso contrario se invoca a la funcion @function fetchDataDictamenes 
 *  para la obtencion de nueva información.
 */

onMounted(() => {
    //Condicional para verificar existencia de información en el store
    /* if (dictamenesList.value.length != 0) {
        // Establece la información del store
        setDataFromResult(dictamenesList.value)
    } else {
        // Realiza la petición al servidor
      } */
    fetchBalances()
    fetchDataDictamenes()
})

</script>

<template>
  <LBreadcrumb :back-route="{ name: 'dashboard.home' }">
    <ol role="list" class="flex items-center space-x-1">
      <li>
        <div>
          <router-link
            :to="{ name: 'dashboard.home' }"
            class="text-slate-400 hover:text-slate-500"
          >
            <svg
              class="flex-shrink-0 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
            <span class="sr-only">Inicio</span>
          </router-link>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-5 h-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <router-link
            :to="{ name: 'dictamenes.home' }"
            class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700"
            >Dictámenes</router-link
          >
        </div>
      </li>
    </ol>
  </LBreadcrumb>
  <div class="py-3 space-y-3 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
    <h2
      class="py-1 text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate"
    >
      Dictámenes
    </h2>
  </div>
  <div class="mt-5 space-y-5">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="border border-solid border-slate-300">
            <div class="flex items-center justify-between">
              <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Lista de dictámenes
              </legend>
              <div>
                <button class="p-2" @click="goToInsert()">
                  <span v-tippy="'Ingresar'">
                    <IconPlus class="w-4 h-4 transform text-slate-600 hover:scale-110 dark:text-slate-300 hover:fill-current hover:text-primary" fill="currentColor" />
                  </span>
                </button>
                <button class="p-2" @click="fetchDataDictamenes()">
                    <span v-tippy="'Actualizar'">
                      <RefreshIcon class="w-4 h-4 transform text-slate-600 hover:scale-110 dark:text-slate-300 hover:fill-current hover:text-primary" :class="loading ? 'animate-spin' : ''" fill="currentColor"/>
                    </span>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-4 p-2">
              <div class="col-span-2">
                <Datepicker v-model="date" locale="es" :maxDate="new Date()" cancelText="Cancelar" selectText="Seleccionar"
                  placeholder="Seleccione una fecha" :enableTimePicker="false" :format="formatPicker" autoApply
                  @update:model-value="fetchDataDictamenes()" :clearable="false" />
              </div>
            </div>
            <LTable :loader="loading">
              <template #head>
                <tr>
                  <LHeaderTh value="Cons." center />
                  <LHeaderTh value="RFC" center />
                  <LHeaderTh value="Folio" center />
                  <LHeaderTh value="Fecha Emisión" center />
                  <LHeaderTh value="Resultado" center />
                  <LHeaderTh value="Densidad" center />
                  <LHeaderTh value="Volumen" center />
                  <LHeaderTh value="Cliente" center />
                  <LHeaderTh value="Acciones" center />
                </tr>
              </template>
              <template #body>
                <tr v-for="(item) in dictamenes" v-if="dictamenes.length > 0" :key="item.id">
                  <LBodyTh :value="item.id" center />
                  <LBodyTd :value="item.rfcDictamen" center />
                  <LBodyTd :value="item.folioDictamen" center />
                  <LBodyTd :value="item.fechaEmisionDictamen" center />
                  <LBodyTd :value="item.resultadoDictamen" center />
                  <LBodyTd :value="item.densidad" center />
                  <LBodyTd :value="item.volumen" center />
                  <LBodyTd :value="item.cliente.nombreCliente" center />
                  <LBodyTd center>
                    <div class="inline-flex shadow-sm" role="group">
                      <span class="mr-2 transform cursor-pointer hover:scale-110" v-tippy="'Editar'" @click="goToEdit(item)">
                        <EditIcon class="w-4 h-4 hover:fill-current hover:text-primary" />
                      </span>
                      <DeleteDictamen :model="item" :id="item.id" @successSubmit="fetchDataDictamenes()" />
                    </div>
                  </LBodyTd>
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
    @changePaginate="fetchDataDictamenes()" />
</template>