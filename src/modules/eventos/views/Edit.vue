<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useToast from '../../dashboard/composables/useToast'
import IconPlus from '@/assets/icons/plus-solid.svg'
import useEvento from '../composables/evento'
import FormEvento from '../components/FormEventos.vue'

/* Declaración de atributos asignables */
const router = useRouter()
const { addToast } = useToast()
const { emit, bus } = useEventsBus()
const { updateEvento } = useEvento()

const loader = ref(false)

/* Declaración de métodos */
async function onSubmit(form) {
  const res = await updateEvento(form)
  const { data, status, message } = res
  if (status == 200) {
    loader.value = false
    
    /* const objBitacora = {
      user: currentUser.value.id,
      actividad: `El usuario ${currentUser.value.username} registró al densidad ${data.foliodensidad}.`,
      evento: 1,
    }
    insertBitacora(objBitacora) */
    addToast({
      message: {
        title: "Éxito!",
        message: `Se actualizó el evento ${data.descripcion} de la lista.`,
        type: "success"
      },
    })
    router.push({ name: 'eventos.home' })
  } else {
    loader.value = false
    addToast({
      message: {
        title: "¡Error!",
        message: message,
        type: "error",
        component: "edit - onSubmit()"
      },
    })
  }
}

watch(() => bus.value.get('ErrorData'), (message) => {
  addToast({
      message: {
        title: "¡Error!",
        message: message,
        type: "error",
        component: "create - ErrorData()"
      },
    })
})

watch(() => bus.value.get('submitForm'), (value) => {
  onSubmit(value[0])
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
            :to="{ name: 'eventos.home' }"
            class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700"
            >Eventos</router-link
          >
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
          <a
            href="#"
            class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700"
            aria-current="page"
            >Editar evento</a
          >
        </div>
      </li>
    </ol>
  </LBreadcrumb>
  <div class="py-3 space-y-3 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
    <h2
      class="py-1 text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate"
    >
      Editar evento
    </h2>
  </div>
  <div class="flex items-center justify-center my-4 ">
    <FormEvento />
  </div>
</template>