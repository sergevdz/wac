import express from 'express'
import user from '../controllers/user'
import { decode } from '../middlewares/jwt.js';

const router = express.Router()

router.get('/logged', decode, user.getLoggedUser)

export default router
