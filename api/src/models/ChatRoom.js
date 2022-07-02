import { Schema, model } from "mongoose";
// import Message from './Message'

const Message = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    collection: 'messages'
  }
);

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    messages: [Message],
    users: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    collection: 'chatRooms'
  }
);

/**
 * @return {array} List of chat rooms
 */
schema.statics.getChatRooms = async function () {
  try {
    const chatRooms = await this.find( { $query: {}, $orderby: { createdAt : 1 } } )
    return chatRooms || [];
  } catch (error) {
    throw error;
  }
}

/**
 * @return {array} List of chat rooms
 */
 schema.statics.getChatRoomsMessages = async function (roomId) {
  try {
    const chatRoom = await this.findOne({ _id: roomId });
    return chatRoom.messages || [];
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} chatRoomId - chat room id
 * @param {String} message - message
 * @return {array} The updated chat room
 */
schema.statics.addNewMessage = async function (chatRoomId, message) {
  try {
    const updateData = this.updateOne(
      { _id: chatRoomId },
      {
        $push: {
          messages: message
        }
      }
    )
    return updateData
  } catch (error) {
    throw error;
  }
}

export default model('ChatRoom', schema);