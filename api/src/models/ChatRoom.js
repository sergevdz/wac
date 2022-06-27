import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    messages: [
      { type: Schema.Types.ObjectId, ref: 'Message' }
    ]
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
    // await this.insertOne(
    //   { _id: '62af78963adfcd483cd619b9' },
    //   { $addToSet: {
    //       message: {
    //         _id: '62ae6526f141ede51b5ed4c8',
    //         // text: 'Hola'
    //       }
    //     } 
    //   },
    //   function (error, success) {
    //     if (error) {
    //       console.log(error);
    //   } else {
    //       console.log(success);
    //   } 
    //   }
    // )
    const chatRooms = await this.find( { $query: {}, $orderby: { createdAt : 1 } } )

    
    return chatRooms || [];
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} chatRoomId - chat room id
 * @param {String} messageId - message id
 * @return {array} The updated chat room
 */
schema.statics.addNewMessage = async function (chatRoomId, messageId) {
  try {
    // const chatRoom = await this.updateOne(
    //   { _id: this._id },
    //   { $push: {
    //     messages: messageId
    //   }}
    // )
    // return chatRoom;
    const updateData = this.updateMany(
      { _id: chatRoomId },
      {
        $addToSet: {
          messages: messageId
        }
      }
    )
    return updateData
  } catch (error) {
    throw error;
  }
}

export default model('ChatRoom', schema);