import express from 'express'
import auth from '../controllers/auth'
import { encode, decode } from '../middlewares/jwt.js';

const router = express.Router()

router.post('/sign-in', auth.onCreateUser)
router.post('/log-in', encode, auth.onUserLogIn)

export default router
