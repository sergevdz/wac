import makeValidation from '@withvoid/make-validation';
import User from '../models/User'

export default {
  onCreateUser: async (req, res) => {
    try {
      res.set('Access-Control-Allow-Origin', '*')
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      const savedUser = await user.save()
      return res.status(200).json({ user: savedUser })
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  onUserLogIn: async (req, res) => {
    try {
      res.set('Access-Control-Allow-Origin', '*')
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          email: { type: types.string },
          password: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { email, password } = req.body
      const user = await User.getValidUser(email, password)
      if (!user) {
        return res.status(401).json({
          error: {
            message: 'No se encontró un usuario con estas credenciales.'
          }
        })
      }
      
      return res.status(200).json({
        user,
        authorization: req.authToken,
      })
    } catch (error) {
      return res.status(500).json({ result: false, error: error })
    }
  },
  getLoggedUser: async (req, res) => {
    try {
      // res.set('Access-Control-Allow-Origin', '*')
      const user = await User.getLoggerUserById(req.userId)
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
  }
}