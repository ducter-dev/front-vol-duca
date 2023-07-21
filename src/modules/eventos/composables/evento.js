import { useEventoStore } from "../store/eventoStore"

const useEvento = () => {
  const store = useEventoStore()

  const fetchEventos = async (params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const getEventos = () => {
    return store.get()
  }

  const insertEvento = async(form) => {
    const resp = await store.insert(form)
    return resp
  }

  const updateEvento = async(form) => {
    const resp = await store.update(form)
    return resp
  }

  const deleteEvento = async(id) => {
    const resp = await store.delete(id)
    return resp
  }

  const setEventoSelected = (evento) => {
    store.eventoSelected = evento
  }

  const getEventosSelected = () => {
    return store.eventoSelected
  }

  return {
    fetchEventos,
    getEventos,
    insertEvento,
    updateEvento,
    deleteEvento,
    setEventoSelected,
    getEventosSelected,
  }
}

export default useEvento