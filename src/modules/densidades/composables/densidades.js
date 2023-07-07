import { useDensidadStore } from '../store/densidadStore'

const useDensidad = () =>{
    const store = useDensidadStore()

    const fetchDensidades = async (params) => {
        console.log(4)
        console.log("🚀 ~ file: densidades.js:7 ~ fetchDensidades ~ params:", params)
        const resp = await store.fetch(params)
        return resp 
    }

    const getDensidades = () =>{
        return store.densidades
    }

    const selectDensidad = (densidad) => {
        store.densidadSelected = densidad
    }
    
    const getDensidadSelected = () => {
        return store.densidadSelected
    }

    const insertDensidad = async(form) => {
        console.log("🚀 ~ file: densidades.js:26 ~ insertDensidad ~ form:", form)
        const resp = await store.insert(form)
        return resp
    }

    const updateDensidad = async(form) => {
        const resp = await store.update(form)
        console.log("🚀 ~ file: densidades.js:34 ~ updateDensidad ~ resp:", resp)
        return resp
    }

    const deleteDensidad = async(id) => {
        const resp = await store.delete(id)
        return resp
    }

    return {
        fetchDensidades,
        selectDensidad,
        getDensidadSelected,
        updateDensidad,
        deleteDensidad,
        insertDensidad,
        getDensidades,
    }
}

export default useDensidad