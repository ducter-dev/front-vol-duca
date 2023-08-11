<script setup>
import { watch, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  useIntervalFn,
  useNow,
  useDateFormat,
  useIdle,
  useCounter,
  useTimestamp,
} from '@vueuse/core'
import useAuth from '../../modules/auth/composables/useAuth'
import useToast from '../../modules/dashboard/composables/useToast'

const { logout } = useAuth()
const router = useRouter()
const { addToast } = useToast()

const now = useTimestamp()

const { idle, lastActive, reset } = useIdle(1 * 60 * 1000)
const { inc, count } = useCounter()

let loader = ref(false)
let isOpen = ref(false)

const goLogout = async () => {
  try {
    await logout()
    router.push({ name: 'auth.login' })
  } catch (error) {
    if (error.status == 401) {
      userStore.clearUser()
      router.push({ name: 'auth.login' })
    }
  }
}

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

const closeModal = () => {
  isOpen.value = !isOpen.value
}

watch(idle, (idleValue) => {
  if (idleValue) {
    inc()
    reset()
  }
})

const idledFor = computed(() => Math.floor((now.value - lastActive.value) / 1000))

watch(idledFor, (newValue) => {
  if (newValue > 0) {
    if (newValue == 1 * 60) {
      addToast({
        message: {
          title: '¡Info!',
          message: `La sesión ha expirado por inactividad.`,
          type: 'info'
        }
      })
      goLogout()
    }
  }
})

</script>
<template>
</template>
