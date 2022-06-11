import request from 'src/commons/request.js'
import { AxiosResponse } from 'axios'

const responseBody = (response: AxiosResponse) => response.data

export default {
  signin: (body) => request.post('auth/sign-in', body).then(responseBody),
  login: (body) => request.post('auth/log-in', body).then(responseBody),
  getProfile: (body) => request.get('auth/profile', body).then(responseBody)
}
