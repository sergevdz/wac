import request, { responseBody, catchError } from 'src/commons/request'

// interface Users {
//   id: number,
//   email: string
// }

export default {
  create: (body?) => request.post('users/', body).then(responseBody).catch(catchError), // .catch(console.info),
  getAll: (params?) => request.get('users/', params).then(responseBody),
  get: (id: int) => request.get('users/' + id).then(responseBody)
}
