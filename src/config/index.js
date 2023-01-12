import axios from 'axios'
const api_url = import.meta.env.VITE_URLAPI

const api_volumetricos = axios.create({
  baseURL: api_url
})

api_volumetricos.interceptors.request.use((config) => {

  config.headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  return config
})

export default api_volumetricos