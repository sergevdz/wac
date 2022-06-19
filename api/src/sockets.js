import Message from './models/Message'

export default (io) => {
  io.on('connection', (socket) => {
    console.log('New user has connected!: ', socket.id)

    const emitMessages = async () => {
      const messages = await Message.getMessages()
      console.log(messages)
      io.emit('loadMessages', messages)
    }
    emitMessages()

    socket.on('addNewMessage', async (message) => {
      const newMessage = new Message({
        text: message.text,
        userId: message.userId
      })
      await newMessage.save()
      emitMessages()
    })
  })
}