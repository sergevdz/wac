import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    username: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * @param {String} username, user name
 * @return {Object} User object
 */
 schema.statics.getUserByName = async function (username) {
  try {
    const user = await this.findOne({ username: username });
    if (!user) throw ({ error: 'No user with this name found' });
    return user;
  } catch (error) {
    throw error;
  }
}

export default model('User', schema);
