import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
/* const api = axios.create({ baseURL: 'https://api.example.com' }); */

export default boot(({ app }) => {
  axios.defaults.baseURL = process.env.API
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  /* app.config.globalProperties.$api = api; */
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // axios.interceptors.request.use(req => {
  //   console.log(req)
  // })

  // axios.interceptors.response.use(response => {
  //   const isValid = response.data instanceof Object || response.data instanceof Array
  //   if (!isValid) {
  //     console.info(response.request.responseURL, response)
  //   }
  //   return response
  // }, error => {
  //   console.info(error)
  //   console.group()
  //   if (error.response) {
  //     if (error.response.status === 401) {
  //       location.reload()
  //     }
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     console.error('Data: ', error.response.data)
  //     console.error('Status: ', error.response.status)
  //     console.error('Headers: ', error.response.headers)
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //     // http.ClientRequest in node.js
  //     console.error('Request: ', error.request)
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     console.error('Message: ', error.message)
  //   }
  //   console.error('Config: ', error.config)
  //   console.groupEnd()
  //   return Promise.reject(error)
  // })
})

export { axios, api }
