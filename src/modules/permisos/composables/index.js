import { usePermisoStore } from '../store/permisoStore'

const usePermiso = () => {

  const store = usePermisoStore()

  const fetchPermisos = async (params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const fetchPermisosAll = async () => {
    const resp = await store.fetchAll()
    return resp
  }

  const getPermisos = () => {
    return store.permisos
  }

  const insertPermiso = async(form) => {
    const resp = await store.insert(form)
    return resp
  }

  const updatePermiso = async(form) => {
    const resp = await store.update(form)
    return resp
  }

  const deletePermiso = async(id) => {
    const resp = await store.delete(id)
    return resp
  }

  const setPermisoSelected = (permiso) => {
    store.permisoSelected = permiso
  }

  const getPermisosSelected = () => {
    return store.permisoSelected
  }

  return {
    fetchPermisos,
    fetchPermisosAll,
    getPermisos,
    setPermisoSelected,
    getPermisosSelected,
    insertPermiso,
    updatePermiso,
    deletePermiso,
  }
}

export default usePermiso