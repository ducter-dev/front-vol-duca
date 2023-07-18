import { useUsuarioStore } from '../store/userStore'

const useUsuario = () => {
  const store = useUsuarioStore()
  
  const fetchUsuarios = async(params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const getUsuarios = () => {
    return store.usuarios
  }

  const insertUsuario = async(form) => {
    const resp = await store.insert(form)
    return resp
  }

  const updateUsuario = async(form) => {
    const resp = await store.update(form)
    return resp
  }

  const deleteUsuario = async(usuario) => {
    const resp = await store.delete(usuario)
    return resp
  }

  const selectUsuario = (usuario) => {
    store.usuarioSelected = usuario
  }

  const getSelectedUsuario = () => {
    return store.usuarioSelected
  }

  return {
    fetchUsuarios,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectUsuario,
    getSelectedUsuario,
    getUsuarios,
  }
}

export default useUsuario