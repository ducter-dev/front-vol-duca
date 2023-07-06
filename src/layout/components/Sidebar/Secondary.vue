<script setup>
import IconHouse from "../../../assets/icons/house.svg"
import IconDictamen from '@/assets/icons/file-invoice-dollar-solid.svg'
import IconDensidades from '@/assets/icons/filtrar.svg'
import IconArchivo from '@/assets/icons/document.svg'
import IconError from '@/assets/icons/triangle-exclamation-solid.svg'
import IconConfig from '@/assets/icons/gear-solid.svg'


</script>
<template>
  <div class="flex-1 overflow-y-auto">
    <div class="p-3 min-h-[64px] lg:min-h-[48px]">
      <p class="text-sm font-semibold business_name text-slate-900 dark:text-slate-100"
        v-tippy="'Ductos del Altiplano'">
        Volumétricos DUCA
      </p>
    </div>
    <nav class="pb-4 mb-8 space-y-5 border-t border-transparent sidebar md:border-slate-200 dark:border-slate-700">
      <div>
        <li>
          <router-link :to="{ name: 'dashboard.home' }"
            exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
            class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
            <IconHouse class="w-5 h-5 mr-3 -ml-1 shrink-0" />
            Inicio
          </router-link>
        </li>
      </div>
      <div>
        <h5 class="mb-2 ml-5 text-xs font-semibold leading-4 tracking-wider text-blue-700 uppercase menu-heading">
          Menu
        </h5>
        <router-link :to="{ name: 'dictamenes.home' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconDictamen class="w-5 h-5 mr-3 -ml-1 shrink-0" fill="currentColor"/>
          <span class="truncate">Dictámenes</span>
        </router-link>
        <router-link :to="{ name: 'densidades.home' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconDensidades class="w-5 h-5 mr-3 -ml-1 shrink-0" fill="currentColor"/>
          <span class="truncate">Densidades</span>
        </router-link>
        <router-link :to="{ name: 'archivos.home' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconArchivo class="w-5 h-5 mr-3 -ml-1 shrink-0" fill="currentColor"/>
          <span class="truncate">Archivos</span>
        </router-link>
        <router-link :to="{ name: 'errores.home' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconError class="w-5 h-5 mr-3 -ml-1 shrink-0" fill="currentColor"/>
          <span class="truncate">Errores</span>
        </router-link>i
        <router-link :to="{ name: 'dashboard.configuration' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconConfig class="w-5 h-5 mr-3 -ml-1 shrink-0" fill="currentColor"/>
          <span class="truncate">Configuración</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
