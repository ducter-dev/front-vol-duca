<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center justify-center">
      <span class="">{{`Mostrando de ${paginacion.from} a ${paginacion.to} de ${paginacion.total}`}}</span>
    </div>
    <div class="flex items-center justify-center">
      <nav aria-label="Pagination">
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <a class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              @click="selectLink(paginacion.first_page_url)"
            >
              <span class="sr-only">Previous</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            </a>
          </li>
          <li v-for="(link, index) in paginacion.links" :key="index">
            <a
              class="px-3 py-2 leading-tight bg-white border "
              :class="link.active ? 'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700'"
              @click="selectLink(link.url)"
            >
              {{ link.label }}
            </a>
          </li>
          <li>
            <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click="selectLink(paginacion.last_page_url)"
            >
              <span class="sr-only">Next</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import { computed, onMounted, ref, watch } from 'vue'
  import useArchivo from '../../modules/archivos/composables/archivos'

  export default {
    setup(props, ctx) {
      const selected = ref(0)
      const { getPaginacion } = useArchivo()
      const paginacion = computed(() => getPaginacion())
  
      const selectLink = (url) => {
        ctx.emit('selectLink', url)
      }
  
      return {
        selectLink,
        paginacion,
      }
    }
  }
  </script>