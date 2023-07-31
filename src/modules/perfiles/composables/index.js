import { usePerfilStore } from '../store/perfilesStore'

const usePerfil = () => {

  const store = usePerfilStore()

  const fetchPerfiles = async (params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const fetchPerfilesAll = async () => {
    const resp = await store.fetchAll()
    return resp
  }

  const getPerfiles = () => {
    return store.perfiles
  }

  const insertPerfil = async(form) => {
    const resp = await store.insert(form)
    return resp
  }

  const updatePerfil = async(form) => {
    const resp = await store.update(form)
    return resp
  }

  const deletePerfil = async(id) => {
    const resp = await store.delete(id)
    return resp
  }

  const setPerfilSelected = (perfil) => {
    store.perfilSelected = perfil
  }

  const getPerfilesSelected = () => {
    return store.perfilSelected
  }

  return {
    fetchPerfiles,
    fetchPerfilesAll,
    getPerfiles,
    setPerfilSelected,
    getPerfilesSelected,
    insertPerfil,
    updatePerfil,
    deletePerfil,
  }
}

export default usePerfil