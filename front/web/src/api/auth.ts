import request from 'src/commons/request.js'
import { AxiosResponse } from 'axios'

const responseBody = (response: AxiosResponse) => response.data

export default {
  login: (body) => request.post('auth/log-in', body).then(responseBody),
  getProfile: (body) => request.get('auth/profile', body).then(responseBody)
}
