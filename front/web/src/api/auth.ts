import request, { responseBody, catchError } from 'src/commons/request'

export default {
  signin: (body) => request.post('auth/sign-in', body).then(responseBody).catch(catchError),
  login: (body) => request.post('auth/log-in', body).then(responseBody).catch(catchError),
  getLoggedUser: () => request.get('auth/logged-user').then(responseBody).catch(catchError)
  // getProfile: (body) => request.get('auth/profile', body).then(responseBody)
}
