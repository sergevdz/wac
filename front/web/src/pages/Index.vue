<template>
  <q-layout>
    <q-page-container class="" style="overflow-y: auto">
      Salas {{ currentChatRoom.name }}
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="(cr, idx) in chatRooms" :key="idx" @click="setCurrentChatRoom(cr)">
            <q-item-section>
              <span style="font-weight:bold;">{{ cr.name }}</span>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <pre>Bienvenido: {{ getUser.name }}</pre>
      <!-- <div class="row q-pa-md" style="height: calc( 100% - 138px);max-height: calc( 100% - 138px)">
        <chat-panel v-model="chatId" />
        <chat-view :key="chatId" />
      </div> -->

      <ul>
        <li v-for="(msg, idx) in chatMessages" :key="idx">
          <span style="font-weight:bold;">{{ msg.userId}}: </span><span>{{ msg.text}}</span>
        </li>
      </ul>
      <br>
      <br>
      <template v-if="currentChatRoom._id">
        <q-input v-model="messageText" type="text" label="Label" />
        <q-btn color="primary" icon="check" label="Enviar" @click="onClickSendMessage" />
      </template>
      <template v-else>
        <span>Por favor seleccione una sala</span>
      </template>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive} from 'vue'
// import ChatPanel from 'src/components/ChatPanel.vue'
// import ChatView from 'src/components/ChatView.vue'
import { useAuthStore } from 'src/stores/use-auth-store'
import { io } from 'socket.io-client'
import { $notify } from 'src/commons/utils'
import api from 'src/api'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  components: {
    // ChatPanel,
    // ChatView
  },
  setup() {
    const { getUser } = useAuthStore()
    const chatMessages = ref([])
    const messageText = ref('')
    const chatRooms = ref([])
    let currentChatRoom = reactive({
      _id: null,
      name: null,
      roomId: null
    })
    // const socket = io()
    const socket = io(process.env.API_WS, {
      // reconnectionDelayMax: 10000
      // auth: {
      //   token: "123"
      // },
      // query: {
      //   userName: getUser.name
      // }
    })
    // socket.emit('join', getUser.name)
    /* socket.on('loadMessages', (messages) => {
      if (messages) {
        chatMessages.value = messages
      }
    }) */
    socket.on('newUserConnected', (userName) => {
      if (userName) {
        $notify('New user connected: ' + userName)
      }
    })
    const loadRoomMessage = () => {
      socket.emit('requestMessageFromRoom', currentChatRoom._id)
    }

    const onClickSendMessage = () => {
      if (currentChatRoom._id) {} else {
        return false
      }
      messageText
      const message = {
        text: messageText.value,
        userId: getUser._id
      }
      socket.emit('addNewMessage', currentChatRoom._id, message)
      messageText.value = ''
    }

    const chatId = ref(-1)

    const getAllChatRooms = async () => {
      chatRooms.value = await api.chatRooms.getAll()
      if (chatRooms.value) {
        chatRooms.value.forEach(cr => {
          socket.on('loadMessagesFromRoom' + cr._id, (messages) => {
            console.log(cr._id, messages)
            if (messages) {
              chatMessages.value = messages
            }
          })
        })
      }
    }
    getAllChatRooms()

    const setCurrentChatRoom = (room: object) => {
      Object.assign(currentChatRoom, room)
      loadRoomMessage()
    }

    return {
      chatId,
      getUser,
      chatMessages,
      messageText,
      onClickSendMessage,
      chatRooms,
      currentChatRoom,
      setCurrentChatRoom
    }
  }
})
</script>
