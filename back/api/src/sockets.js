import Message from './models/Message'
import chatRoom from './controllers/chat-room'
import { ENV } from "./config"

export default (io) => {
  io.on('connection', (socket) => {
    console.log('New user has connected!: ', socket.id)

    if (ENV !== 'production') {
      socket.onAny((event, ...args) => {
        console.log(new Date().toISOString(), event, args);
      });
    }

    // Emite los mensajes de una sala
    const emitRoomMessages = async (roomId) => {
      const messages = await chatRoom.getMessages(roomId)
      io.emit('loadMessagesFromRoom' + roomId, messages)
    }

    // Cuando un usuario agrega un mensaje
    socket.on('addNewMessage', async (roomId, message) => {
      try {
        await chatRoom.createMessage(roomId, message)
        emitRoomMessages(roomId)
      } catch (error) {
        console.error(error)
      }
    })

    // Cuando un usuario accede a un room
    socket.on('requestMessageFromRoom', async (roomId) => {
      try {
        emitRoomMessages(roomId)
      } catch (error) {
        console.error(error)
      }
    })

    // Cuando un usuario se desconecta
    socket.on('disconnect', (socket) => {
      try {
        console.log('A user has disconnected!: ', socket.id)
      } catch (error) {
        console.error(error)
      }
    })
  })
}