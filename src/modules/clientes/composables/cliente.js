import { useClienteStore } from "../store/clienteStore"

const useCliente = () => {
  const store = useClienteStore()

  const fetchClientes = async (params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const getClientes = () => {
    return store.get()
  }

  const insertCliente = async(form) => {
    const resp = await store.insert(form)
    return resp
  }

  const updateCliente = async(form) => {
    const resp = await store.update(form)
    return resp
  }

  const deleteCliente = async(id) => {
    const resp = await store.delete(id)
    return resp
  }

  const setClienteSelected = (perfil) => {
    store.perfilSelected = perfil
  }

  const getClienteesSelected = () => {
    return store.perfilSelected
  }

  return {
    fetchClientes,
    getClientes,
    insertCliente,
    updateCliente,
    deleteCliente,
    setClienteSelected,
    getClienteesSelected,
  }
}

export default useCliente