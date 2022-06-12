import jwt from 'jsonwebtoken';
import User from '../models/User'

const SECRET_KEY = 'some-secret-key'; // TODO tomar de variables de entorno

export const encode = async (req, res, next) => {
  try {
    const { username } = req.body; // req.params
    const user = await User.getUserByName(username);
    const payload = {
      userId: user._id,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
}

export const decode = (req, res, next) => {
  if (!req.headers['Authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    // req.userType = decoded.type;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}