import { useCompuestoStore } from "../store/compuestosStore"

const useCompuesto = () => {
  const store = useCompuestoStore()

  const fetchCompuestos = async (params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const fetchCompuestosAll = async (params) => {
    const resp = await store.fetchAll(params)
    return resp
  }

  const getCompuestos = () => {
    return store.compuestos
  }

  const insertCompuesto = async(form) => {
    const resp = await store.insert(form)
    return resp
  }

  const updateCompuesto = async(form) => {
    const resp = await store.update(form)
    return resp
  }

  const deleteCompuesto = async(id) => {
    const resp = await store.delete(id)
    return resp
  }

  const setCompuestoSelected = (compuesto) => {
    store.compuestoSelected = compuesto
  }

  const getCompuestosSelected = () => {
    return store.compuestoSelected
  }

  return {
    fetchCompuestos,
    fetchCompuestosAll,
    getCompuestos,
    insertCompuesto,
    updateCompuesto,
    deleteCompuesto,
    setCompuestoSelected,
    getCompuestosSelected,
  }
}

export default useCompuesto