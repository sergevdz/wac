import ChatRoom from '../models/ChatRoom'

export default {
  getAll: async (req, res) => {
    try {
      const chatRooms = await ChatRoom.getChatRooms()
      return res.status(200).json(chatRooms)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}