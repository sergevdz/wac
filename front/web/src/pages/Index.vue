<template>
  <q-layout>
    <q-page-container class="" style="overflow-y: auto">
      <pre>Bienvenido: {{ getUser.name }}</pre>
      <!-- <div class="row q-pa-md" style="height: calc( 100% - 138px);max-height: calc( 100% - 138px)">
        <chat-panel v-model="chatId" />
        <chat-view :key="chatId" />
      </div> -->

      <ul>
        <li v-for="(msg, idx) in chatMessages" :key="idx">
          <span>{{ msg.author}}: {{ msg.text}}</span>
        </li>
      </ul>
      <br>
      <br>
      <q-input v-model="messageText" type="text" label="Label" />
      <q-btn color="primary" icon="check" label="Enviar" @click="onClick" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
// import ChatPanel from 'src/components/ChatPanel.vue'
// import ChatView from 'src/components/ChatView.vue'
import { useAuthStore } from 'src/stores/use-auth-store'
import { io } from 'socket.io-client'
import { $notify } from 'src/commons/utils'

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
    socket.emit('join', getUser.name)
    socket.on('loadMessages', (messages) => {
      if (messages) {
        chatMessages.value = messages
      }
    })
    socket.on('newUserConnected', (userName) => {
      if (userName) {
        $notify('New user connected: ' + userName)
      }
    })

    const onClick = () => {
      messageText
      const message = {
        author: getUser.name,
        text: messageText.value
      }
      socket.emit('addNewMessage', message)
      messageText.value = ''
    }
    // messages.value.push({ author: '', text: 'tx'})
    // messages.value.push({ author: '', text: 'tx2'})
    // messages.value.push({ author: '', text: 'tx3'})
    // const $router = useRouter()
    // const jwt = localStorage.getItem('jwt')
    // const jwtExists = Boolean(jwt)
    // if (jwtExists) {
    //   // TODO - Intentar cargar perfil
    //   // TODO - Guardar perfil en store
    // } else {
    //   $router.push('/login')
    // }

    const chatId = ref(-1)

    return {
      chatId,
      getUser,
      chatMessages,
      messageText,
      onClick
    }
  }
})
</script>
