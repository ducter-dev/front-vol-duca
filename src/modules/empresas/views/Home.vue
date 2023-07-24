<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRouter } from 'vue-router'
import EditIcon from "@/assets/icons/pencil.svg"
import RefreshIcon from "@/assets/icons/refresh.svg"
import useEventsBus from "../../../layout/eventBus"
import useToast from "../../dashboard/composables/useToast"
import IconPlus from '@/assets/icons/plus-solid.svg'
import IconEyes from '@/assets/icons/eyes.svg'
import Paginate from '@/layout/components/Paginate/Index.vue'
import useEmpresa from "../composables/empresa"

/* Declaración de atributos asignables */
const { bus } = useEventsBus()
const { fetchEmpresas, setEmpresaSelected } = useEmpresa()
const { addToast } = useToast()
const router = useRouter()

let empresas = ref([])
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
        message: "No existen registros en nuestros servidores.",
        type: "error"
      },
    })
  }
  empresas.value = data
  loading.value = false
}

/**
 *  Función que consulta `fetchDataEmpresas`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */

const fetchDataEmpresas = async () => {
  try {
    loading.value = true
    const params = { page: pagination.current_page}
    const res = await fetchEmpresas(params)
    const { data, status, message, paginacion } = res

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

/* const goToInsert = () => {
  router.push({ name: 'empresas.create'})
} */

const goToEdit = (item) => {
  setEmpresaSelected(item)
  router.push({ name: 'empresas.edit'})
}

const goToView = (item) => {
  setEmpresaSelected(item)
  router.push({ name: 'empresas.show'})
}

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var userList sera asignado,
 *  en caso contrario se invoca a la funcion @function fetchDataEmpresas 
 *  para la obtencion de nueva información.
 */

onMounted(() => {
  fetchDataEmpresas()
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
            :to="{ name: 'empresas.home' }"
            class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700"
            >Empresas</router-link
          >
        </div>
      </li>
    </ol>
  </LBreadcrumb>
  <div class="py-3 space-y-3 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
    <h2
      class="py-1 text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate"
    >
      Empresas
    </h2>
  </div>
  <div class="mt-5 space-y-5">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="border border-solid border-slate-300">
            <div class="flex items-center justify-between">
              <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Lista de empresas
              </legend>
            </div>
            <LTable :loader="loading">
              <template #head>
                <tr>
                  <LHeaderTh value="Consecutivo" center />
                  <LHeaderTh value="Descripción" center />
                  <LHeaderTh value="RFC Contribuyente" center />
                  <LHeaderTh value="Proveedor" center />
                  <LHeaderTh value="Num. Permiso" center />
                  <LHeaderTh value="Producto" center />
                  <LHeaderTh value="Acciones" center />
                </tr>
              </template>
              <template #body>
                <tr v-for="item in empresas" v-if="empresas.length > 0" :key="item.id">
                  <LBodyTh :value="item.id" center />
                  <LBodyTh :value="item.descripcion" center />
                  <LBodyTh :value="item.rfc_contribuyente" center />
                  <LBodyTh :value="item.proveedor" center />
                  <LBodyTh :value="item.num_permiso" center />
                  <LBodyTh :value="item.producto.descripcion" center />

                  <LBodyTd center>
                    <div class="inline-flex shadow-sm" role="group">
                      <span class="mr-2 transform cursor-pointer hover:scale-110" v-tippy="'Editar'" @click="goToEdit(item)">
                        <EditIcon class="w-4 h-4 hover:fill-current hover:text-primary" />
                      </span>
                      <span class="mr-2 transform cursor-pointer hover:scale-110" v-tippy="'Ver'" @click="goToView(item)">
                        <IconEyes class="w-4 h-4 hover:text-primary" />
                      </span>
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
    @changePaginate="fetchDataEmpresas()" />
</template>