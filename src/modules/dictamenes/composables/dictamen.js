import { useDictamenStore } from '../store/dictamenStore'

const useDictamen = () => {
  const store = useDictamenStore()
  
  const fetchDictamenes = async(dateToUse) => {
    const resp = await store.fetch(dateToUse)
    return resp
  }

  const fetchDictamenesLink = async (params) => {
    const resp = await store.fetchLink(params)
		return resp
  }

  const getDictamenes = () => {
    return store.dictamenes
  }

  const insertDictamen = async(dictamen) => {
    const resp = await store.insert(dictamen)
    return resp
  }

  const updateDictamen = async(dictamen) => {
    const resp = await store.update(dictamen)
    return resp
  }

  const deleteDictamen = async(idDictamen) => {
    console.log("🚀 ~ file: dictamen.js:31 ~ deleteDictamen ~ idDictamen:", idDictamen)
    const resp = await store.delete(idDictamen)
    return resp
  }

  const selectDictamen = (dictamen) => {
    store.dictamenSelected = dictamen
  }

  const getDictamenSelected = () => {
    return store.dictamenSelected
  }

  const countDictamenesTemporal = () => {
    return store.countDictamenesTemporal
  }

  const selectFecha = (fecha)=> {
    store.setFechaSelect(fecha)
  }

  const getSelectFecha = () =>{
    return store.fechaSelect
  }

  const getPaginacion = () => {
		return store.paginacion
	}

  const setPaginacion = (data) => {
		store.paginacion = data
	}

  return {
    fetchDictamenes,
    getDictamenes,
    insertDictamen,
    updateDictamen,
    deleteDictamen,
    selectDictamen,
    getDictamenSelected,
    countDictamenesTemporal,
    selectFecha,
    getSelectFecha,
    fetchDictamenesLink,
    getPaginacion,
    setPaginacion,
  }
}

export default useDictamen