import { useEmpresaStore } from '../store/empresaStore'

const useEmpresa = () => {
  const store = useEmpresaStore()
  
  const fetchEmpresas = async() => {
    const resp = await store.get()
    return resp
  }

  const getEmpresas = () => {
    return store.empresas
  }

  const showEmpresa = async(empresa) =>{
    const resp = await store.showEmpresa(empresa)
    return resp
  }

  const insertEmpresa = async(empresa) => {
    const resp = await store.insert(empresa)
    return resp
  }

  const updateEmpresa = async(empresa) => {
    const resp = await store.update(empresa)
    return resp
  }

  const deleteEmpresa = async(empresa) => {
    const resp = await store.delete(empresa)
    return resp
  }

  const addCurrentEmpresa = (empresa) => {
    store.currentEmpresa = empresa
  }

  const getCurrentEmpresa = () => {
    return store.currentEmpresa
  }

  return {
    fetchEmpresas,
    showEmpresa,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    addCurrentEmpresa,
    getCurrentEmpresa,
    getEmpresas,
  }
}

export default useEmpresa