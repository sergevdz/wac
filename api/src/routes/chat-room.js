import express from 'express'
import chatRoom from '../controllers/chat-room'

const router = express.Router()

router.get('/', chatRoom.getAll)

export default router
