import ChatRoom from '../models/ChatRoom'

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
      const upadtedChatRoom = await ChatRoom.addNewMessage(roomId, message)
      return upadtedChatRoom
    } catch (error) {
      console.error(error)
    }
  },
  getMessages: async (roomId) => {
    try {
      const messages = await ChatRoom.getChatRoomsMessages(roomId)
      return messages
    } catch (error) {
      console.error(error)
    }
  }
}