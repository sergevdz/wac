import { Schema, model, Types } from 'mongoose';

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
    },
    contactIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
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
    // if (!user) throw ({ message: 'No user with this credentials found' });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} id
 * @return {Object} User object
 */
schema.statics.getLoggerUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} id
 * @return {Object} User object
 */
schema.statics.getAllExceptMe = async function (params) {
  try {
    const excludedUserId = params.excludedUserId || 0
    const userName = params.userName || ''

    const match = {}
    if (excludedUserId) {
      match._id = { $ne: Types.ObjectId(excludedUserId) }
    }
    if (userName) {
      match.name = { $regex: userName, $options: 'i' }
    }

    const users = await this.aggregate([
      {
        $match: match,
      },
      {
        $project: {
          password: 0
        }
      }
    ]);
    return users;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} userId - user id
 * @param {array} contactIds - contactIds
 * @return {array} The updated chat room
 */
 schema.statics.addContacts = async function (userId, contactIds) {
  try {
    const updateData = this.updateOne(
      { _id: userId },
      {
        // $push: {
        $addToSet: {
          contactIds: contactIds
        }
      }
    )
    return updateData
  } catch (error) {
    throw error;
  }
}

export default model('User', schema);
