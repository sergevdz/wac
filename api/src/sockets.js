import Message from './models/Message'
import chatRoom from './controllers/chat-room'
export default (io) => {
  io.on('connection', (socket) => {
    console.log('New user has connected!: ', socket.id)

    const emitMessages = async () => {
      const messages = await Message.getMessages()
      io.emit('loadMessages', messages)
    }
    emitMessages()

    socket.on('addNewMessage', async (roomId, message) => {
      try {
        // TODO - Validar que exista roomId y message
        console.log(roomId, message)
        await chatRoom.createMessage(roomId, message)
        emitMessages()
      } catch (error) {
        console.error(error)
      }
    })
  })
}