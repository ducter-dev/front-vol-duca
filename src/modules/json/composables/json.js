import { useJsonStore } from '../store/jsonStore'

const useJson = () => {
  const store = useJsonStore()
  
  const fetchJsonDiario = async (fecha) => {
    const resp = await store.fetchDiario(fecha)
    return resp
  }

  const downloadJsonDiario = async (fecha) => {
    await store.downloadDiario(fecha)
  }

  const fetchJsonMensual = async (fechaInicio, fechaFinal) => {
    const resp = await store.fetchMensual(fechaInicio, fechaFinal)
    return resp
  }

  const downloadJsonMensual = async (fechaInicio, fechaFinal) => {
    console.log("🚀 ~ file: json.js ~ line 21 ~ downloadJsonMensual ~ downloadJsonMensual")
    return await store.downloadMensual(fechaInicio, fechaFinal)
  }

  const getJson = () => {
    return store.get()
  }

  const getUrl = (ruta) => {
    return store.gerURL(ruta)
  }

  const actualizarInformacion = async (fecha) =>{
    const resp = await store.informacionActualizada(fecha)
    return resp
  }
  
  return {
    fetchJsonDiario,
    downloadJsonDiario,
    getJson,
    fetchJsonMensual,
    downloadJsonMensual,
    getUrl,
    actualizarInformacion,
  }
}

export default useJson