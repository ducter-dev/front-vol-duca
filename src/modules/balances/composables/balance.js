import { useBalanceStore } from '../store/balanceStore'

const useBalance = () => {
  const store = useBalanceStore()
  
  const fetchBalances = async() => {
    const resp = await store.fetch()
    return resp
  }

  const getBalances = () => {
    return store.get()
  }

  const insertBalance = async(balance) => {
    const resp = await store.insert(balance)
    return resp
  }

  const updateBalance = async(balance) => {
    const resp = await store.update(balance)
    return resp
  }

  const deleteBalance = async(balance) => {
    const resp = await store.delete(balance)
    return resp
  }

  const getBalanceByDate = (fecha) => {
    console.log(fecha)
    const balance = store.balances.find( (bal) => bal.fecha ===  fecha)
    return balance
  }

  const fecthBalance = async (id_balance) => {
    const resp = await store.fetchBalance(id_balance)
    return resp
  }

  const changeBalance = (balance) => {
    console.log('changeBalance')
    console.log(balance)
    store.cambiarBalance(balance)
  }

  return {
    fetchBalances,
    getBalances,
    insertBalance,
    updateBalance,
    deleteBalance,
    getBalanceByDate,
    fecthBalance,
    changeBalance,
  }
}

export default useBalance