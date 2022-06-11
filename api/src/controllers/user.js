import User from '../models/User'

export default {
  onCreateUser: async (req, res) => {
    try {
      const user = new User({
        username: req.body.username
      })
      const savedUser = await user.save()
      return res.status(200).json({ user: savedUser })
    } catch (error) {
      return res.status(500).json({ result: false, error: error })
    }
  },
  onUserLogIn: async (req, res) => {
    try {
      console.log(req)
      const user = await User.getUserByName(req.body.username)
      return res.status(200).json({
        user,
        authorization: req.authToken,
      })
    } catch (error) {
      return res.status(500).json({ result: false, error: error })
    }
  }
}