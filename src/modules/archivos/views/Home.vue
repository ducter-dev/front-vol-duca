<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import useArchivo from '../composables/archivos';
import CardDescargaDiaria from '@/layout/components/Card/CardDescargaDiaria.vue'
import IconPlus from '@/assets/icons/plus-solid.svg'
import TablaArchivosMensuales from '../components/TableArchivosMensuales.vue'
import useEmpresa from '../../empresas/composables/empresa'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import useToast from "../../dashboard/composables/useToast"
import Paginate from '@/layout/components/Paginate/Index.vue'

const router = useRouter()
const { fetchArchivos, fetchArchivosMensuales } = useArchivo()
const { getCurrentEmpresa } = useEmpresa()
const archivos = ref([])
const archivosMensuales = ref([])
let empresaST = ref(null)
const { addToast } = useToast()
let loading = ref(false)

const links = ref([])
const meta = ref([])
let pagination = reactive({
  current_page: 1
})

const linksMensuales = ref([])
const metaMensual = ref([])
let paginationMensual = reactive({
  current_page: 1
})

const setDataFromResult_Diarios = (data) => {
  if (data.length == 0) {
    addToast({
      message: {
        title: "Error!",
        message: "No existen registros con esa fecha.",
        type: "error"
      },
    })
  }
  archivos.value = data
  loading.value = false
}

const setDataFromResult_Mensuales = (data) => {
  if (data.length == 0) {
    addToast({
      message: {
        title: "Error!",
        message: "No existen registros para este período.",
        type: "error"
      },
    })
  }
  archivosMensuales.value = data
  loading.value = false
}

const obtenerArchivos = async () => {
  try {
    loading.value = true
    const params = { page: pagination.current_page }
    const res = await fetchArchivos(params)
    const { data, status, message, paginacion } = res
    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 200) {
      setDataFromResult_Diarios(data)
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
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error}`,
        type: "error"
      },
    })
  }
}

const obtenerArchivosMensuales = async () => {
  try {
    loading.value = true
    const params = { page: paginationMensual.current_page }
    const res = await fetchArchivosMensuales(params)
    const { data, status, message, paginacion } = res
    if (status == 200) {
      setDataFromResult_Mensuales(data)
      linksMensuales.value = paginacion.links
      metaMensual.value = paginacion.meta
      paginationMensual = paginacion.meta

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
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error}`,
        type: "error"
      },
    })
  }
}

const nuevoArchivo = () => {
  router.push('/archivos/nuevo')
}

const nuevoArchivoMensual = () => {
  router.push('/archivos/nuevoMensual')
}

const obtenerEmpresaActiva = async () => {
  try {
    empresaST = await getCurrentEmpresa()
    obtenerArchivos()
    obtenerArchivosMensuales()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  obtenerEmpresaActiva()
})

</script>

<template>
  <div class="flex flex-col w-full m-2 ml-8 mr-7 sm:mx-12 sm:my-2">
    <TabGroup>
      <TabList>
        <Tab as="template" v-slot="{ selected }">
          <button class="border focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2
            mr-5 md-10 mt-8 md:mr-3 md:mt-3 "
            :class="{ 'bg-blue-500 text-white': selected, 'bg-white text-dark': !selected }">
            Diarios
          </button>
        </Tab>

        <Tab as="template" v-slot="{ selected }">
          <button class="border focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2
            mr-5 md-10 mt-8 md:mr-3 md:mt-3 "
            :class="{ 'bg-blue-500 text-white': selected, 'bg-white text-dark': !selected }">
            Mensual
          </button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div class="mt-4 mb-8">
            <div class="flex flex-row items-center justify-between w-full h-20">
              <div class="flex flex-row items-center justify-center">
                <div class="flex items-center justify-center mr-2 text-xl font-bold text-dark">Generar nuevo archivo
                  diario</div>
                <button type="button"
                  class="inline-flex items-center p-2 text-sm font-medium text-center border rounded-full text-dark border-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300"
                  @click="nuevoArchivo">
                  <IconPlus class="w-4 h-4" fill="currentColor" />
                </button>
              </div>
            </div>
            <LTable :loader="loading">
              <template #head>
                <tr>
                  <LHeaderTh value="Nombre de Archivo" center />
                  <LHeaderTh value="Fecha Balance" center />
                  <LHeaderTh value="Usuario" center />
                  <LHeaderTh value="Creación" center />
                </tr>
              </template>
              <template #body>
                <tr v-for="(item) in archivos" v-if="archivos.length > 0" :key="item.id">
                  <LBodyTh :value="item.nombre" center />
                  <LBodyTd :value="item.balance.fecha" center />
                  <LBodyTd :value="item.usuario.nombre" center />
                  <LBodyTd :value="item.creado" center />
                </tr>
                <tr v-else>
                  <LBodyTh value="Sin información" colspan="7" center />
                </tr>
              </template>
            </LTable>
            <Paginate v-if="pagination.last_page > 1" :pagination="pagination" :offset="7"
              @changePaginate="obtenerArchivos()" />
          </div>
        </TabPanel>
        <TabPanel>
          <div class="mt-4 mb-4">
            <div class="flex flex-row items-center justify-between w-full h-20">
              <div class="flex flex-row items-center justify-center">
                <div class="flex justify-center mr-2 text-xl font-bold text-dark">Generar nuevo archivo mensual</div>
                <button type="button"
                  class="inline-flex items-center p-2 text-sm font-medium text-center border rounded-full text-dark border-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300"
                  @click="nuevoArchivoMensual">
                  <IconPlus class="w-4 h-4" fill="currentColor" />
                </button>
              </div>
            </div>
            <LTable :loader="loading">
              <template #head>
                <tr>
                  <LHeaderTh value="Nombre de Archivo" center />
                  <LHeaderTh value="Fecha Balance" center />
                  <LHeaderTh value="Usuario" center />
                  <LHeaderTh value="Creación" center />
                </tr>
              </template>
              <template #body>
                <tr v-for="(item) in archivosMensuales" v-if="archivosMensuales.length > 0" :key="item.id">
                  <LBodyTh :value="item.nombre" center />
                  <LBodyTd :value="item.balance.fecha" center />
                  <LBodyTd :value="item.usuario.nombre" center />
                  <LBodyTd :value="item.creado" center />
                </tr>
                <tr v-else>
                  <LBodyTh value="Sin información" colspan="7" center />
                </tr>
              </template>
            </LTable>
            <Paginate v-if="paginationMensual.last_page > 1" :pagination="paginationMensual" :offset="7"
              @changePaginate="obtenerArchivosMensuales()" />
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>