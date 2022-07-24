import request, { responseBody, catchError } from 'src/commons/request'

// interface Users {
//   id: number,
//   email: string
// }

export default {
  create: (body?) => request.post('users/', body).then(responseBody).catch(catchError), // .catch(console.info),
  getAll: (params?) => request.get('users/', params).then(responseBody),
  // get: (id: int) => request.get('users/' + id).then(responseBody),
  addContacts: (body?) => request.put('users/contacts', body).then(responseBody),
  deleteContact: (id: string) => request.delete(`users/contacts/${id}`).then(responseBody),
  getLoggedUser: () => request.get('users/logged', {}).then(responseBody).catch(catchError)
}
