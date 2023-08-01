<script setup>
import { ref, watch, computed, reactive } from 'vue'
import useAuth from '../composables/useAuth'

const classInput = ref('')
const showNotificacion = ref(false)
const message = ref('')
const isEqualsPass = ref(false)
const isDisabled = ref(true)

const { getCurrentUser, updatePass } = useAuth()
const user = computed(() => getCurrentUser())

const form = reactive({
	id: user.value.id,
	contrasena: '',
	contrasena_confirmation: ''
})

const onSubmit = async () => {
	try {
		const { data, status, message } = await updatePass(form)
		if (status == 200) {
			addToast({
				message: {
					title: "Éxito!",
					message: `Se actualizó el password del usuario ${data.nombre}.`,
					type: "success"
				},

			})
			loader.value = false
			router.push('/dashboard')
		} else {
			loader.value = false
			addToast({
				message: {
					title: "¡Error!",
					message: message,
					type: "error",
					component: "create - onSubmit()"
				},
			})
		}
	} catch (error) {

	}
}
const checkPassword = () => {
	console.log('check pass')
	if (form.contrasena === form.contrasena_confirmation) {
		message.value = ''
		isEqualsPass.value = true
		const isLong = form.contrasena.length > 7
		const myRegExpMayus = /[A-Z]/
		const myRegSimbolos = /\W/
		const mayusTest = myRegExpMayus.test(form.contrasena_confirmation)
		const simbolTest = myRegSimbolos.test(form.contrasena_confirmation)
		if (!isLong || !mayusTest || !simbolTest) {
			isDisabled.value = true
			classInput.value = 'border-primary'
			message.value = `${isLong ? '' : 'La contraseña debe tener al menos 8 caracteres. '}${mayusTest ? '' : 'La contraseña debe tener una letra MAYÚSCULA. '}${simbolTest ? '' : 'La contraseña debe tener al menos un símbolo.'}`
			showNotificacion.value = true
		} else {
			classInput.value = 'border-blue-700'
			showNotificacion.value = false
			isDisabled.value = false
		}
	} else {
		message.value = 'Las contraseñas no coinciden.'
		isEqualsPass.value = false
		isDisabled.value = true
		classInput.value = 'border-red-700'
		showNotificacion.value = true
	}
}

watch(form, () => {
	checkPassword()
})

</script>

<template>
	<h1 class="mb-5 text-2xl font-bold text-center">Actualizar Contraseña</h1>
	<div class="flex flex-row items-center justify-center mb-6">
		<p class="font-semibold text-gray-600">Usuario {{ user.nombre }}</p>
	</div>
	<form class="w-full bg-white divide-y divide-gray-200 rounded-lg shadow" @submit.prevent="onSubmit">
		<div class="px-5 py-7">
			<label class="block pb-1 text-sm font-semibold text-gray-600">Contraseña</label>
			<input v-model="form.contrasena" type="password" class="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
				:class="classInput" />
			<label class="block pb-1 text-sm font-semibold text-gray-600">Confirmar Contraseña</label>
			<input v-model="form.contrasena_confirmation" type="password" class="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
				:class="classInput" />
			<div v-show="showNotificacion"
				class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
				<span class="font-medium">Error!</span> {{ message }}
			</div>
			<div class="mx-2">
				<button class="inline-flex items-center justify-center w-full p-2 text-white duration-300 scale-105 hover:bg-logo"
					:class="isDisabled ? 'disabled:opacity-25 disabled:cursor-not-allowed bg-gradient-to-r from-primary bg-link' : 'bg-gradient-to-r from-text-gray-600 bg-slate-800'"
					:disabled="isDisabled">
					Guardar
				</button>
			</div>
		</div>

	</form>
</template>

