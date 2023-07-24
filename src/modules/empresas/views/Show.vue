<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useToast from '../../dashboard/composables/useToast'
import useEmpresa from '../composables/empresa'
import TextPlane from '../../../layout/components/Form/TextPlane.vue'


/* Declaración de atributos asignables */
const router = useRouter()
const loader = ref(false)

const { getEmpresasSelected } = useEmpresa()
const empresa = computed(() => getEmpresasSelected())
</script>

<template>
  <LBreadcrumb :back-route="{ name: 'dashboard.home' }">
    <ol role="list" class="flex items-center space-x-1">
      <li>
        <div>
          <router-link :to="{ name: 'dashboard.home' }" class="text-slate-400 hover:text-slate-500">
            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="sr-only">Inicio</span>
          </router-link>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <router-link :to="{ name: 'empresas.home' }"
            class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700">Empresas</router-link>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <a href="#" class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700" aria-current="page">Mostar
            empresa</a>
        </div>
      </li>
    </ol>
  </LBreadcrumb>
  <div
    class="py-3 space-y-3 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
    <h2 class="py-1 text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate">
      Mostrar empresa
    </h2>
  </div>
  <div class="flex items-center justify-center my-4 ">
    <div class="relative p-4 mt-5 bg-white shadow-md dark:bg-slate-800 sm:rounded-lg">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div class="col-span-3 space-y-4">
          <div class="flex flex-wrap items-baseline ">
            <h3 class="text-lg font-medium leading-6 text-slate-900 dark:text-white">
              Datos Empresa
            </h3>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <TextPlane label="Descripción">{{ empresa.descripcion }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Versión">{{ empresa.version }}</TextPlane>
            </div>
            <div>
              <TextPlane label="RFC Contribuyente">{{ empresa.rfc_contribuyente }}</TextPlane>
            </div>
            <div>
              <TextPlane label="RFC Representante">{{ empresa.rfc_representante }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Proveedor">{{ empresa.proveedor }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Tipo Caracter">{{ empresa.tipo_caracter }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Modalidad Permiso">{{ empresa.modalidad_permiso }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Número Permiso">{{ empresa.num_permiso }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Clave Instalación">{{ empresa.clave_instalacion }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Descripción Instalación">{{ empresa.descripcion_instalacion }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Geolocalización Latitud">{{ empresa.geolocalizacion_latitud }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Geolocalización Longitud">{{ empresa.geolocalizacion_longitud }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Número Tanques">{{ empresa.numero_tanques }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Núumero de Ductos E-S">{{ empresa.numero_ductos_entradas_salidas }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Núumero de Ductos Distribución">{{ empresa.numero_ductos_distribucion }}</TextPlane>
            </div>
            <div>
              <TextPlane label="Producto Omisión">{{ empresa.producto.descripcion }}</TextPlane>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>