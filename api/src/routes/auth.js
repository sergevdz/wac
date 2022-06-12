import express from 'express'
import user from '../controllers/user'
import { encode, decode } from '../middlewares/jwt.js';

const router = express.Router()

router.post('/sign-in', user.onCreateUser)
router.post('/log-in', encode, user.onUserLogIn)
router.get('/logged-user', decode, user.getLoggedUser)

export default router
