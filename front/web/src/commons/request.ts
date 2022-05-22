import { axios } from 'boot/axios'
import qs from 'qs'
import { AxiosResponse } from 'axios'
import ApiError from 'src/api/apierror'

export function responseBody(response: AxiosResponse) {
  return response.data
}

export function catchError(e) {
  const msg = e?.response?.data.error.message
  throw new ApiError(msg)
}

const api = {
  get: (url: string, params) =>
    axios.get(url, {
      params: params,
      paramsSerializer: (params) => qs.stringify(params)
    }),
  post: (url: string, params) => axios.post(url, qs.stringify(params)),
  put: (url: string, params) => axios.put(url, qs.stringify(params)),
  delete: (url: string, params) => axios.delete(url, qs.stringify(params)),
  file: (url: string, params) =>
    axios.post(url, params, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  stringify: (params) => qs.stringify(params)
}

export default api
