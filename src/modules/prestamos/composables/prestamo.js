import { usePrestamoStore } from '../store/prestamos'

const usePrestamo = () => {

  const store = usePrestamoStore()

  const fetchPrestamos = async(params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const getPrestamos = () => {
    return store.prestamos
  }

  const insertPrestamo = async(prestamo) => {
    const resp = await store.insert(prestamo)
    return resp
  }

  const updatePrestamo = async(prestamo) => {
    const resp = await store.update(prestamo)
    return resp
  }

  const deletePrestamo = async(prestamo) => {
    const resp = await store.delete(prestamo)
    return resp
  }

  const selectPrestamo = (prestamo) => {
    store.prestamoSelected = prestamo
  }

  const getSelectPrestamo = () => {
    return store.prestamoSelected
  }

  const selectFecha = (fecha)=> {
    store.setFechaSelect(fecha)
  }

  const getSelectFecha = () =>{
    return store.fechaSelect
  }

  return {
    fetchPrestamos,
    getPrestamos,
    insertPrestamo,
    updatePrestamo,
    selectPrestamo,
    getSelectPrestamo,
    deletePrestamo,
    selectFecha,
    getSelectFecha,
  }
}

export default usePrestamo