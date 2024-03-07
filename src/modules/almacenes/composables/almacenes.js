import { useAlmacenStore } from '../store/almacenes'

const useAlmacenes = () => {

  const store = useAlmacenStore()

  const fetchAlmacenes = async(params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const getAlmacenes = () => {
    return store.almacenes
  }

  const insertAlmacen = async(almacen) => {
    const resp = await store.insert(almacen)
    return resp
  }

  const updateAlmacen = async(almacen) => {
    const resp = await store.update(almacen)
    return resp
  }

  const deleteAlmacen = async(almacen) => {
    const resp = await store.delete(almacen)
    return resp
  }

  const selectAlmacen = (almacen) => {
    store.almacenSelected = almacen
  }

  const getSelectAlmacen = () => {
    return store.almacenSelected
  }

  const selectFecha = (fecha)=> {
    store.setFechaSelect(fecha)
  }

  const getSelectFecha = () =>{
    return store.fechaSelect
  }

  return {
    fetchAlmacenes,
    getAlmacenes,
    insertAlmacen,
    updateAlmacen,
    selectAlmacen,
    getSelectAlmacen,
    deleteAlmacen,
    selectFecha,
    getSelectFecha,
  }
}

export default useAlmacenes