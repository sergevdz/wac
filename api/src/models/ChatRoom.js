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
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    messages: [Message]
      // { type: Schema.Types.ObjectId, ref: 'Message' }
      //{ type: [Message] }
    // ]
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