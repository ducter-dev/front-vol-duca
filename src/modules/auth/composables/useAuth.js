import { useLoginStore } from '../store/login'
import useBitacora  from '../../bitacora/composables'


const useAuth = () => {

  const store = useLoginStore()
  const { insertBitacora } = useBitacora()
  
  
  const login = async( formUser ) => {
    const resp = await store.login(formUser)
    console.log("🚀 ~ file: useAuth.js:13 ~ login ~ resp:", resp)
    return resp
  }

  const logout = async (bitacora) => {
    store.logout()
    return true
  }

  const getToken = () => {
    const token = store.token
    return token
  }

  const getUserName = () => {
    const userName = store.user ? store.user.usuario : '' 
    return userName
  }

  const setlocked = async(usuario) => {
    console.log("🚀 ~ file: useAuth.js:33 ~ setlocked ~ usuario:", usuario)
    const resp = await store.locked(usuario)
    return resp
  }

  const getCurrentUser = () => {
    return store.user
  }

  const activateAccount = async(formUser) => {
    const resp = await store.activateAccount(formUser)
    return resp
  }
  
  const updatePass = async(formUser) => {
    const resp = await store.updatePass(formUser)
    return resp
  }

  const recoveryPass = async(correo) => {
    const resp = await store.recoveryPass(correo)
    return resp
  }

  const guardarIntentos = async(formUser) =>{
    const resp = await store.gestionarIntentos(formUser)
    return resp
  }

  const bloquearUsuario = async(formBloqueo) => {
    const resp = await store.bloquearUsuario(formBloqueo)
    return resp
  }

  const getLocalUser = () => {
    store.user = JSON.parse(localStorage.user)
    return store.user
  }

  const getIdCaducado = () => {
    return store.id_caducado
  }

  return {
    login,
    logout,
    getToken,
    getUserName,
    setlocked,
    getCurrentUser,
    activateAccount,
    updatePass,
    recoveryPass,
    guardarIntentos,
    bloquearUsuario,
    getLocalUser,
    getIdCaducado,
  }
}

export default useAuth