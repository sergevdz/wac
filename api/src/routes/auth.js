import express from 'express'
import user from '../controllers/user'

const router = express.Router()

router.post('/sign-in', user.onCreateUser)
router.post('/log-in', user.onUserLogIn)

export default router
