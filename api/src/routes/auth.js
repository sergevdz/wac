import express from 'express'
import user from '../controllers/user'
import { encode } from '../middlewares/jwt.js';

const router = express.Router()

router.post('/sign-in', user.onCreateUser)
router.post('/log-in', encode, user.onUserLogIn)

export default router
