<script setup>
import { computed, ref } from 'vue'
import useAuth from '../composables/useAuth'


const { getCurrentUser } = useAuth()
const user = computed(() => getCurrentUser())

const correo = ref('')
const onSubmit = () => {
    console.log('submit')
}

</script>

<template>
    <h1 class="mb-5 text-2xl font-bold text-center">Recuperar Contraseña</h1>
    <div class="flex flex-row items-center justify-center mb-6">
        <p class="font-semibold text-gray-600">Usuario {{ user.nombre }}</p>
    </div>
    <form class="w-full bg-white divide-y divide-gray-200 rounded-lg shadow" @submit.prevent="onSubmit">
        <div class="px-5 py-7">
            <label class="block pb-1 text-sm font-semibold text-gray-600">Correo</label>
            <input type="email" class="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"/>
            <div class="mx-2">
                <button class="inline-flex items-center justify-center w-full p-2 text-white duration-300 scale-105 disabled:opacity-25 disabled:cursor-not-allowed bg-gradient-to-r from-primary bg-link hover:bg-logo">
                    Guardar
                </button>
            </div>
        </div>
        
    </form>
</template>

