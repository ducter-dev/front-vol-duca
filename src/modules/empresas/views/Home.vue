<template>
  <div class="w-full m-10 ml-10 mr-7 sm:mx-12 sm:my-2 flex flex-col">
    <ModalDeleteVue :config="configModal" :class="showModal ? '' : 'hidden'" @submitModal="checkModal"/>
    <router-link to="/configuracion">
    <button type="button" class="text-dark border border-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center ml-6 md:ml-8 xl:ml-0">
      <IconLeft class="w-4 h-4" fill="currentColor"/>
    </button>
    </router-link>
    <div class="w-full flex flex-row justify-between items-center h-20">
      <div class="flex flex-row justify-center items-center">
        <div class="flex justify-center items-center text-xl font-bold text-dark mr-2 md:ml-8 ml-5 xl:ml-0">Empresa</div>
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
            " 
            @click="nuevaEmpresa"
          >
            <IconPlus class="w-4 h-4" fill="currentColor" />
          </button>
      </div>
    </div>
    <div v-show="empresas.length > 0">
      <TablaEmpresa :empresas="empresas" @deleteEmpresa="mostrarModalEliminar" @editEmpresa="editarEmpresa"/>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue'
import useEmpresas from '../composables/empresa'
import { useEmpresaStore } from '../store/empresaStore'
import { useRouter } from 'vue-router'
import IconPlus from '@/assets/icons/plus-solid.svg'
import TablaEmpresa from '../../../components/Tables/TablaEmpresa.vue'
import IconLeft from '@/assets/icons/caretLeft.svg'
import ModalDeleteVue from '../../../components/Modals/ModalDelete.vue'

export default {
  components: { IconPlus, TablaEmpresa, IconLeft, ModalDeleteVue },
  setup() {
    const store = useEmpresaStore()
    const storeEmpresa = useEmpresaStore()
    const router = useRouter()
    const showModal = ref(false)
    const configModal = ref({})
    const empresaSelected = ref({})
    const { fetchEmpresas, deleteEmpresa } = useEmpresas()
    const empre = computed(() => store.empresas)
    let empresas = ref([])
    const nuevaEmpresa = () => {
      router.push('/configuracion/empresas/nuevo')
    }

    const obtenerEmpresas = async ()  => {
      try {
        const res = await fetchEmpresas()
        const { data, ok } = res
        if (ok) {
          empresas.value = []
          empresas.value = data
        }
      } catch (error) {
        console.log(error)
      }
    }

    const editarEmpresa = (empresa) => {
      store.empresaSelected = empresa
      router.push('/configuracion/empresas/editar')
    }

    const mostrarModalEliminar = (empresa) => {
      showModal.value = true
      configModal.value = {
        text: `¿Desea eliminar la empresa ${empresa.descripcion}?`,
        okText: 'Ok',
        cancelText: 'Cancelar'
      }
      empresaSelected.value = empresa
    }
    const checkModal = (result) => {
      if (!result) {
        showModal.value = false
        return
      }
      eliminarEmpresa()
    }
    const eliminarEmpresa = async() => {
      try {
        const res = await deleteEmpresa(empresaSelected.value)
        const { data, ok } = res
        if (ok) {
          empresaSelected.value = {}
          empresas.value = storeEmpresa.empresas
          configModal.value = {}
          showModal.value = false
        }
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      if (!empre.value || empre.value.length < 1) {
        obtenerEmpresas()
      } else {
        empresas.value = store.empresas
      }
    })

    return {
      empresas,
      editarEmpresa,
      mostrarModalEliminar,
      empresaSelected,
      configModal,
      showModal,
      checkModal,
      IconPlus,
      nuevaEmpresa,
    }
  }
}
</script>