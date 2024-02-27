import { useArchivosStore } from '../store/archivosStore'

const useArchivo = () =>{
	const store = useArchivosStore()

	const fetchArchivos = async(params) => {
		const resp = await store.fetch(params)
		return resp
	}

	const fetchArchivosMensuales = async(params) => {
		const resp = await store.fetchMensual(params)
		return resp
	}

	const fetchArchivosBE = async(idEmpresa) => {
		const resp = await store.fetchByEnterprice(idEmpresa)
		return resp
	}

	const fetchArchivosMensualesBE = async(idEmpresa) => {
		const resp = await store.fetchMensualByEnterprice(idEmpresa)
		return resp
	}

	const fetchArchivosLink = async(link) => {
		const resp = await store.fetchLink(link)
		return resp
	}

	const fetchArchivosLinkMensual = async(link) => {
		const resp = await store.fetchLinkMensual(link)
		return resp
	}

	const getArchivos = () => {
		return store.get()
	}

	const insertArchivo = async(form) => {
		const resp = await store.insert(form)
		return resp
	}

	const insertArchivoMensual = async(form) => {
		return await store.insertMensual(form)
	}

	const updateArchivo = async(archivo) => {
		const resp = await store.update(archivo)
		return resp
	}

	const deleteArchivo = async(archivo) => {
		const resp = await store.delete(archivo)
    return resp
	}
	
	const setFechaSelect = (fecha) => {
		store.setFechaSelect(fecha)
	}

	const getFechaSelect = () => {
		return store.getFechaSelect()
	}

	const generateArchivo = async (fecha)  => {
		const resp = await store.generate(fecha)
		return resp
	}

	const downloadJson = (url) => {
		store.downloadDiario(url)
	}

	const downloadJsonMensual = (url) => {
		store.downloadMensual(url)
	}

	const getPaginacion = () => {
		return store.paginacion
	}

	const setPaginacion = (data) => {
		store.paginacion = data
	}

	const getPaginacionMensual = () => {
		return store.paginacionMensual
	}

	const setPaginacionMensual = (data) => {
		store.paginacionMensual = data
	}
	
	return{
		fetchArchivos,
		fetchArchivosMensuales,
		fetchArchivosLinkMensual,
		getArchivos,
		insertArchivo,
		updateArchivo,
		deleteArchivo,
		setFechaSelect,
		getFechaSelect,
		downloadJson,
		getPaginacion,
		setPaginacion,
		getPaginacionMensual,
		setPaginacionMensual,
		fetchArchivosLink,
		insertArchivoMensual,
		downloadJsonMensual,
		fetchArchivosBE,
		fetchArchivosMensualesBE,
	}
}

export default useArchivo