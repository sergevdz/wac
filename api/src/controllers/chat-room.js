import ChatRoom from '../models/ChatRoom'
import { Types } from "mongoose";

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
  },
  createNewChat: async (req, res) => {
    try {
      const name = (Math.random() + 1).toString(36).substring(7)
      const userIds = [req.userId].concat(req.body.userIds)
      const ChatRoom1 = new ChatRoom({
        name: name,
        userIds: userIds
      })
      const savedChatRoom = await ChatRoom1.save()
      return res.status(200).json(savedChatRoom)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}