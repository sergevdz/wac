import Message from './models/Message'
import chatRoom from './controllers/chat-room'
export default (io) => {
  io.on('connection', (socket) => {
    console.log('New user has connected!: ', socket.id)

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
  })
}