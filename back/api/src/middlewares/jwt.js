import jwt from 'jsonwebtoken';
import User from '../models/User'
import { JWT_SECRET_KEY } from '../config'

export const encode = async (req, res, next) => {
  try {
    const { username } = req.body; // req.params
    const user = await User.getUserByName(username);
    const payload = {
      userId: user._id,
    };
    const authToken = jwt.sign(payload, JWT_SECRET_KEY);
    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ error: { message: error.message } });
  }
}

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ error: { message: 'No access token provided' } });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next()
  } catch (error) {
    return res.status(400).json({ error: { message: error.message } });
  }
}