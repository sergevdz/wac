import express from 'express'
import user from '../controllers/user'
import { decode } from '../middlewares/jwt.js';

const router = express.Router()

router.get('/logged', decode, user.getLoggedUser)
router.get('/', decode, user.getAllUsersExceptMe)
router.put('/contacts', decode, user.addContacts) // PUT /users/contacts
router.get('/contacts', decode, user.getContacts) // GET /users/contacts
router.delete('/contacts/:contactId', decode, user.deleteContact) // GET /users/contacts/id

export default router
