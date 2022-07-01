import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    // roomId: {
    //   type: String,
    //   required: true
    // },
  },
  {
    timestamps: true,
    collection: 'messages'
  }
);

/**
 * @return {array} List of messages
 */
schema.statics.getMessages = async function () {
  try {
    const messages = await this.find( { $query: {}, $orderby: { createdAt : 1 } } )
    // if (!messages) throw ({ message: 'No messages were found' });
    return messages || [];
  } catch (error) {
    throw error;
  }
}

export default model('Message', schema);