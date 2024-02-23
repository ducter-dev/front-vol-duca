<template>
	<div class="flex flex-col w-full m-2 sm:mx-12 sm:my-2">
		<div class="flex flex-row items-center justify-start mt-5 ml-5 sm:ml-0">
			<div class="flex items-center justify-center mr-2">
				<h2 class="flex items-center justify-center mr-2 text-xl font-bold text-dark">Nuevo archivo mensual </h2>
			</div>
			<button type="button" class="inline-flex items-center p-2 text-sm font-medium text-center border rounded-full text-dark border-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300" @click="goBack">
				<IconLeft class="w-4 h-4" fill="currentColor" />
			</button>
		</div>
		<div class="flex flex-row items-center justify-center w-full">
			<div class="flex flex-row items-center justify-start w-full mx-2 my-4">
				<div class="flex justify-center mx-2">
					<span class="flex items-center justify-center mt-1 mb-1 mr-2 text-sm font-bold text-gray-400">
						Periodo:
					</span>
					<Datepicker v-model="date" monthPicker locale="es" :enableTimePicker="false" autoApply />
				</div>
				<div class="flex justify-center mx-2">
					<button type="button"
						class="px-3 py-2 text-xs font-medium text-center text-white rounded-lg bg-dark hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500"
						@click="crearJson">
						Generar Archivo
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconLeft from '@/assets/icons/caretLeft.svg'
import { useToast } from 'vue-toastification'
import useArchivo from '../composables/archivos'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format, startOfMonth, lastDayOfMonth } from 'date-fns'
import useBitacora from '../../bitacoras/composables/bitacora'

export default {
	components: { IconLeft, Datepicker },
	setup(context) {
		const router = useRouter()
		const { insertArchivoMensual } = useArchivo()
		const { addBitacora } = useBitacora()
		const toast = useToast()
		const date = ref({
			month: new Date().getMonth(),
			year: new Date().getFullYear()
		})
		const goBack = () => {
			router.go(-1)
		}

		const formatPicker = () => {
			return format(date.value, 'dd-MM-yyyy')
		}

		const crearJson = async () => {
			try {
				const monthstr = new Date(date.value.year, date.value.month)
				const fechaInicio = format(startOfMonth(monthstr), 'yyyy-MM-dd')
				const fechaFin = format(lastDayOfMonth(monthstr), 'yyyy-MM-dd')

				const res = await insertArchivoMensual(fechaInicio, fechaFin)
				const { ok, data } = res
				
				if (ok) {
					toast.success(`El archivo ha sido generado exitosamente`, {
						position: "bottom-right",
						timeout: 2000,
						closeOnClick: true,
						pauseOnFocusLoss: true,
						pauseOnHover: true,
						draggable: true,
						draggablePercent: 0.6,
						showCloseButtonOnHover: false,
						hideProgressBar: true,
						closeButton: "button",
						icon: true,
						rtl: false
					})
					router.push('/archivos')
				} else {
					addBitacora(data.data)
					toast.error(`${res.data.error}`, {
						position: "bottom-right",
						timeout: 2000,
						closeOnClick: true,
						pauseOnFocusLoss: true,
						pauseOnHover: true,
						draggable: true,
						draggablePercent: 0.6,
						showCloseButtonOnHover: false,
						hideProgressBar: true,
						closeButton: "button",
						icon: true,
						rtl: false
					})
				}
			} catch (error) {
				addBitacora(data.data)
				toast.error(`Error: ${error}`, {
					position: "bottom-right",
					timeout: 2000,
					closeOnClick: true,
					pauseOnFocusLoss: true,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 0.6,
					showCloseButtonOnHover: false,
					hideProgressBar: true,
					closeButton: "button",
					icon: true,
					rtl: false
				})
			}
		}

		return {
			crearJson,
			IconLeft,
			goBack,
			date,
			formatPicker,
		}
	}
}
</script>
