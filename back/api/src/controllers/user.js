import makeValidation from '@withvoid/make-validation';
import User from '../models/User'

export default {
  getLoggedUser: async (req, res) => {
    try {
      const user = await User.getPopulatedUserById(req.userId)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  getAllUsersExceptMe: async (req, res) => {
    try {
      const params = req.query
      const excludingMe = params.excludingMe || 0
      if (excludingMe) {
        params.excludedUserId = req.userId
      }
      const users = await User.getAllExceptMe(params)
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  addContacts: async (req, res) => {
    try {
      const userId = req.userId
      const contactIds = req.body.contactIds
      const saved = await User.addContacts(userId, contactIds)
      return res.status(200).json(saved)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  getContacts: async (req, res) => {
    try {
      const userId = req.userId
      const contacts = await User.getContacts(userId)
      return res.status(200).json(contacts)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  deleteContact: async (req, res) => {
    try {
      const contacts = await User.deleteContact(req.userId, req.params.contactId)
      return res.status(200).json(contacts)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}