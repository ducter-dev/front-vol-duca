import axios from 'axios'
import CryptoJS from 'crypto-js'
const api_url = import.meta.env.VITE_URLAPI

const key = import.meta.env.VITE_API_KEY

const api_volumetricos = axios.create({
  baseURL: api_url
})

api_volumetricos.interceptors.request.use((config) => {

  config.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
  
  return config
})


/* api_volumetricos.interceptors.response.use((response) => {
  var encrypted_json = JSON.parse(atob(response.data))
  console.log("🚀 ~ file: index.js:24 ~ api_volumetricos.interceptors.response.use ~ encrypted_json:", encrypted_json)
  

  var decrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(key), {
    iv: CryptoJS.enc.Base64.parse(encrypted_json.iv)
  })
  console.log("🚀 ~ file: index.js:30 ~ decrypted ~ decrypted:", decrypted)

  const new_obj = { ...response, data: JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)) }
  console.log("🚀 ~ file: index.js:34 ~ api_volumetricos.interceptors.response.use ~ new_obj:", new_obj)
  
  return new_obj
}, (error) => {
  if (error.response) {
    if (error.response.status == 404) {
      return Promise.reject(error.response)
    }

    if (error.response.status == 401) {
      return Promise.reject(error.response)
    }

    var Error_encrypted_json = JSON.parse(atob(error.response.data))

    var decryptedError = CryptoJS.AES.decrypt(
      Error_encrypted_json.value,
      CryptoJS.enc.Base64.parse(key),
      {
        iv: CryptoJS.enc.Base64.parse(Error_encrypted_json.iv)
      }
    )

    const new_obj = {
      ...error.response,
      data: JSON.parse(decryptedError.toString(CryptoJS.enc.Utf8))
    }

    return Promise.reject(new_obj)
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
    // http.ClientRequest en node.js

    return Promise.reject({
      status: null,
      error: { message: 'Conexión rechazada con nuestros servidores. Código de error:000001' }
    })
  } else {
    return Promise.reject({
      status: null,
      error: {
        message:
          'Ha ocurrido un error inesperado, por favor vuelve a intentarlo. Código de error:000000'
      }
    })
  }
})
 */
export default api_volumetricos