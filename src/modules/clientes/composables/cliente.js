import { useClienteStore } from "../store/clienteStore"

const useCliente = () => {
  const store = useClienteStore()

  const fetchClientes = async () => {
    const resp = await store.fetch()
    return resp
  }

  const getClientes = () => {
    return store.get()
  }

  return {
    fetchClientes,
    getClientes,
  }
}

export default useCliente