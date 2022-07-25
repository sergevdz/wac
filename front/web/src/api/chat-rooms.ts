import request, { responseBody, catchError } from 'src/commons/request'

export default {
  getAll: () => request.get('chat-rooms').then(responseBody).catch(catchError),
  startNewRoom: (body) => request.post('chat-rooms', body).then(responseBody).catch(catchError)
}
