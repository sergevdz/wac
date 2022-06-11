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
      return res.status(200).json({
        user,
        authorization: req.authToken,
      })
    } catch (error) {
      return res.status(500).json({ result: false, error: error })
    }
  }
}