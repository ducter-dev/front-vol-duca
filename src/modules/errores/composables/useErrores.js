import { useErrorStore } from '../store/erroresStore'

const useError = () =>{
    const store = useErrorStore()

    const fetchErrores = async (params) =>{
        const resp = await store.fetch(params)
        return resp 
    }

    const getErrores = () =>{
        return store.error
    }

    return {
        fetchErrores,
        getErrores,
    }
}

export default useError