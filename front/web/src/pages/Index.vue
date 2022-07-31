<template>
  <q-layout>
    <q-page-container class="" style="overflow-y: auto">
      <!-- HEADER -->
      <div class="row">
        <div class="col-sm-10">
          <pre>Bienvenido: {{ myCurrentUser.name }}</pre>
        </div>
        <div class="col-sm-2 q-pa-xs text-right">
          <q-btn color="primary" icon="check" label="Salir" @click="onClickLogout" />
        </div>
      </div>
      <div class="row">
        <!-- DRAWER -->
        <div class="col-sm-3 debug">
          <div class="row">
            <div class="col-sm-9 debug">
              Conversaciones {{ currentChatRoom.name }}
            </div>
            <div class="col-sm-3 text-center debug">
              <q-btn
                :flat="canShowStartNewChat !== false"
                label="Nuevo"
                color="primary"
                size="sm"
                inverse
                padding="xs"
                @click="toggleStartNewChat(!canShowStartNewChat)"
              >
                &nbsp;<q-icon name="fas fa-plus-circle"  />
              </q-btn>
            </div>
          </div>
          <div class="q-pa-md" style="max-width: 350px">
            <q-list bordered separator>
              <q-item
                clickable
                v-ripple
                v-for="(cr, idx) in chatRooms"
                :key="idx"
                @click="setCurrentChatRoom(cr)"
              >
                <q-item-section>
                  <span style="font-weight:bold;">{{ cr.name }}</span>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <!-- CONTENT -->
        <div class="col-sm-9 debug">
          <template v-if="canShowStartNewChat">
            <start-new-chat
              @reloadChats="getAllChatRooms"
              @setNewChat="setCurrentChatRoom($event)"
              @cancelStartNewChat="canShowStartNewChat = false"

            />
          </template>
          <template v-else>
            <pre>{{ currentChatRoom.name }}</pre>
            <template v-if="currentChatRoom._id">
              <ul class="debug-green">
                <li v-for="(msg, idx) in chatMessages" :key="idx">
                  <span style="font-weight:bold;">{{ msg.userId }}: </span>
                  <span>{{ msg.text}}</span>
                </li>
              </ul>
              <br>
              <br>
              <q-input v-model="messageText" type="text" label="Label" />
              <q-btn color="primary" icon="check" label="Enviar" @click="onClickSendMessage" />
            </template>
            <template v-else>
              <span>Por favor seleccione una sala</span>
            </template>
          </template>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive} from 'vue'
import { useAuthStore } from 'src/stores/use-auth-store'
import { io } from 'socket.io-client'
import { $notify } from 'src/commons/utils'
import api from 'src/api'
import StartNewChat from 'src/components/StartNewChat.vue'
import { Room } from 'src/core/types/types'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  components: {
    StartNewChat
  },
  setup() {
    const { removeStoken } = useAuthStore()
    const { currentUser } = useAuthStore()
    const myCurrentUser = ref(currentUser)
    const chatMessages = ref([])
    const messageText = ref('')
    const chatRooms = ref([])
    const canShowStartNewChat = ref(false)
    let currentChatRoom = reactive({
      _id: null,
      name: null
      // roomId: null
    })

    const socket = io(process.env.API_WS, {
      // reconnectionDelayMax: 10000
      // auth: {
      //   token: "123"
      // },
      // query: {
      //   userName: getUser.name
      // }
    })
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
        userId: currentUser._id
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
            if (messages) {
              chatMessages.value = messages
            }
          })
        })
      }
    }
    getAllChatRooms()

    const setCurrentChatRoom = (room: Room) => {
      Object.assign(currentChatRoom, room)
      loadRoomMessage()
    }

    /* const reloadUserInfo = async () => {
      const user = await api.users.getLoggedUser()
      storeUser(user)
    } */

    const toggleStartNewChat = (show: boolean) => {
      canShowStartNewChat.value = show
    }

    const onClickLogout = () => {
      removeStoken()
    }

    return {
      chatId,
      myCurrentUser,
      chatMessages,
      messageText,
      onClickSendMessage,
      chatRooms,
      currentChatRoom,
      setCurrentChatRoom,
      onClickLogout,
      toggleStartNewChat,
      canShowStartNewChat,
      getAllChatRooms
    }
  }
})
</script>
