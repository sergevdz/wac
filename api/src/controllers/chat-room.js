import ChatRoom from '../models/ChatRoom'
import Message from '../models/Message'

export default {
  getAll: async (req, res) => {
    try {
      const chatRooms = await ChatRoom.getChatRooms()
      return res.status(200).json(chatRooms)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  createMessage: async (roomId, message) => {
    try {
      // const message = req.message
      // const newMessage = new Message(message)
      // await newMessage.save()
      const upadtedChatRoom = await ChatRoom.addNewMessage(roomId, message)
      console.log('se creo room', upadtedChatRoom)
      // return res.status(200).json(newMessage)
    } catch (error) {
      // return res.status(500).json({ error })
      console.error(error)
    }
  }
}