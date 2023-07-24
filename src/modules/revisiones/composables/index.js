import { useRevisionStore } from '../store/revisionStore'

const useRevision = () =>{
    const store = useRevisionStore()

    const fetchRevisiones = async (params) => {
        const resp = await store.fetch(params)
        return resp 
    }

    const getRevisiones = () =>{
        return store.revisiones
    }

    const selectRevision = (revision) => {
        store.revisionSelected = revision
    }
    
    const getRevisionSelected = () => {
        return store.revisionSelected
    }

    const insertRevision = async(form) => {
        console.log("🚀 ~ file: revisiones.js:26 ~ insertRevision ~ form:", form)
        const resp = await store.insert(form)
        return resp
    }

    const updateRevision = async(form) => {
        const resp = await store.update(form)
        console.log("🚀 ~ file: revisiones.js:34 ~ updateRevision ~ resp:", resp)
        return resp
    }

    const deleteRevision = async(id) => {
        const resp = await store.delete(id)
        return resp
    }

    return {
        fetchRevisiones,
        selectRevision,
        getRevisionSelected,
        updateRevision,
        deleteRevision,
        insertRevision,
        getRevisiones,
    }
}

export default useRevision