import { Schema, model } from 'mongoose';

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
    },
    email: {
      type: String,
      trim: true,
      required: 'Email address is required',
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      trim: true,
      required: 'Password is required',
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

/**
 * @param {String} id, user id
 * @return {Object} User object
 */
 schema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} username, user name
 * @return {Object} User object
 */
 schema.statics.getUserByName = async function (username) {
  try {
    const user = await this.findOne({ username: username });
    if (!user) throw ({ message: 'No user with this name found' });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} email
 * @param {String} password
 * @return {Object} User object
 */
 schema.statics.getValidUser = async function (email, password) {
  try {
    const user = await this.findOne({ email: email, password: password });
    if (!user) throw ({ message: 'No user with this credentials found' });
    return user;
  } catch (error) {
    throw error;
  }
}

export default model('User', schema);
