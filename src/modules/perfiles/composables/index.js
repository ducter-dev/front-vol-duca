import { usePerfilStore } from '../store/perfilesStore'

const usePerfil = () => {

  const store = usePerfilStore()

  const fetchPerfiles = async () => {
    const resp = await store.fetch()
    return resp
  }

  const getPerfiles = () => {
    return store.perfiles
  }

  const setPerfilSelected = (perfil) => {
    store.perfilSelected = perfil
  }

  const getPerfilesSelected = () => {
    return store.perfilSelected
  }

  return {
    fetchPerfiles,
    getPerfiles,
    setPerfilSelected,
    getPerfilesSelected,
  }
}

export default usePerfil