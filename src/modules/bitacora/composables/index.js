import { useBitacoraStore } from "../store/bitacora"


const useBitacora = () => {
  const store = useBitacoraStore()
  

  const fetchBitacoras = async() => {
    const resp = await store.fetch()
    return resp
  }

  const getBitacoras = () => {
    return store.get()
  }

  const insertBitacora = async(bitacora) => {
    const resp = await store.insert(bitacora)
    return resp
  }

  const updateBitacora = async(bitacora) => {
    const resp = await store.update(bitacora)
    return resp
  }

  const deleteBitacora = async(bitacora) => {
    const resp = await store.delete(bitacora)
    return resp
  }

  const filterFecha = async(fecha) => {
    const resp = await store.filter(fecha)
    return resp
  }

  const selectBitacora = (bitacora) => {
    store.selectBitacora(bitacora)
  }
  
  const getSelectedBitacora = () => {
    return store.getSelectedBitacora()
  }

  const addBitacora = (bitacora) => {
    store.add(bitacora)
  }

  return {
    fetchBitacoras,
    insertBitacora,
    updateBitacora,
    deleteBitacora,
    getBitacoras,
    filterFecha,
    selectBitacora,
    getSelectedBitacora,
    addBitacora,
  }
}

export default useBitacora