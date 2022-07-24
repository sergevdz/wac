import { axios } from 'boot/axios'
import qs from 'qs'
import { AxiosResponse } from 'axios'
// import ApiError from 'src/api/apierror'

export function responseBody(response: AxiosResponse) {
  return response.data
}

export function catchError(e) {
  try {
    const msg = e?.response?.data.error.message || 'Error'
    // throw new ApiError(msg)
    throw { message: msg }
  } catch (error) {
    console.error(error)
  }
}

const request = {
  get: (url: string, params) =>
    axios.get(url, {
      params: params,
      paramsSerializer: (params) => qs.stringify(params)
    }),
  post: (url: string, params) => axios.post(url, qs.stringify(params)),
  put: (url: string, params) => axios.put(url, qs.stringify(params)),
  delete: (url: string) => axios.delete(url),
  file: (url: string, params) =>
    axios.post(url, params, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  stringify: (params) => qs.stringify(params)
}

export default request
