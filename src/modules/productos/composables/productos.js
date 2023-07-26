import { useProductoStore } from '../store/productoStore'

const useProducto = () =>{
    const store = useProductoStore()

    const fetchProductos = async (params) => {
        const resp = await store.fetch(params)
        return resp 
    }

    const fetchProductosAll = async () => {
        const resp = await store.fetchAll()
        return resp 
    }

    const getProductos = () =>{
        return store.productos
    }

    const selectProducto = (producto) => {
        store.productoSelected = producto
    }
    
    const getProductoSelected = () => {
        return store.productoSelected
    }

    const insertProducto = async(form) => {
        const resp = await store.insert(form)
        return resp
    }

    const syncCompuestos = async(form) => {
        const resp = await store.syncCompuestos(form)
        return resp
    }

    const updateProducto = async(form) => {
        const resp = await store.update(form)
        return resp
    }

    const deleteProducto = async(id) => {
        const resp = await store.delete(id)
        return resp
    }

    return {
        fetchProductos,
        fetchProductosAll,
        selectProducto,
        getProductoSelected,
        updateProducto,
        deleteProducto,
        insertProducto,
        getProductos,
        syncCompuestos,
    }
}

export default useProducto