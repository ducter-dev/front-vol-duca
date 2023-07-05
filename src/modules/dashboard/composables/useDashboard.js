import { useDashboardStore } from '../store/dashboard.js'

const useDashboard = () => {

  const store = useDashboardStore()
  
  const bloquearUsuario = async(formBloqueo) => {
    const resp = await store.bloquearUsuario(formBloqueo)
    return resp
  }

  return {
    bloquearUsuario,
  }
}

export default useDashboard