import { useLoginStore } from '../store/login'

const useAuth = () => {

  const store = useLoginStore()

  const loginUser = async( formUser ) => {
    const resp = await store.login(formUser)
    return resp
  }

  const logoutUser = async() => {
    const resp = await store.logout()
    return resp
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

  const userLogued = () => {
    return store.user
  }

  const guardarIntentos = async(formUser) =>{
    const resp = await store.gestionarIntentos(formUser)
    return resp
  }

  const bloquearUsuario = async(formBloqueo) => {
    const resp = await store.bloquearUsuario(formBloqueo)
    return resp
  }

  return {
    loginUser,
    logoutUser,
    updatePass,
    userLogued,
    activateAccount,
    recoveryPass,
    guardarIntentos,
    bloquearUsuario,
  }
}

export default useAuth