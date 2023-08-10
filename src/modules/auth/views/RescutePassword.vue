<script setup>
import { computed, ref } from 'vue'
import useToast from '../../dashboard/composables/useToast'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { recoveryPass } = useAuth()
const { addToast } = useToast()
const router = useRouter()

const correo = ref('')
const onSubmit = async () => {
	const { status, message } = await recoveryPass(correo.value)
	console.log("🚀 ~ file: RescutePassword.vue:14 ~ onSubmit ~ message:", message)
	console.log("🚀 ~ file: RescutePassword.vue:14 ~ onSubmit ~ status:", status)

	if (status == 200) {
		addToast({
			message: {
				title: "¡Éxito!",
				message,
				type: "info"
			},
		})
		setInterval(() => {
			router.push({ name: 'auth.login' })
		}, 200)
	} else {
		addToast({
			message: {
				title: "¡Error!",
				message,
				type: "error"
			},
		})
	}

}

</script>

<template>
	<h1 class="mb-5 text-2xl font-bold text-center">Recuperar Contraseña</h1>
	<form class="w-full bg-white divide-y divide-gray-200 rounded-lg shadow" @submit.prevent="onSubmit">
		<div class="px-5 py-7">
			<label class="block pb-1 text-sm font-semibold text-gray-600">Correo</label>
			<input type="email" class="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg" v-model="correo" />
			<div class="mx-2">
				<button
					class="inline-flex items-center justify-center w-full p-2 text-white duration-300 scale-105 disabled:opacity-25 disabled:cursor-not-allowed bg-gradient-to-r from-primary bg-link hover:bg-logo">
					Enviar
				</button>
			</div>
		</div>
	</form>
	<div class="py-5">
		<div class="flex flex-row-reverse">
			<div class="text-center sm:text-left whitespace-nowrap">
				<router-link :to="{ name: 'auth.login' }"
					class="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						class="inline-block w-4 h-4 align-text-top">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					<span class="inline-block ml-1">volver</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

