<template>
  <div class="col-sm-8">
    <!-- Cabecera de chat -->
    <div class="row">
      <div class="col-sm-12 q-pa-xs" style="border: 1px solid #202c33;">
        <div class="row">
          <div class="col-sm-6">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </div>
          <div class="col-sm-6 text-right">
            <q-btn flat round icon="favorite" />
            <q-btn flat round icon="bookmark" />
            <q-btn flat round icon="share" />
          </div>
        </div>
      </div>
    </div>
    <!-- Zona de menajes -->
    <div class="row" style="height: 443px;">
      <div class="col-sm-12 q-pa-md" style="height:inherit;border: 1px solid red; overflow-y: auto;">
        <q-chat-message
          v-for="(chat, idx) in chatEntities"
          text-sanitize
          :name="chat.userName"
          :text="chat.text"
          :sent="chat.sent ? chat.sent : false"
          :key="idx"
        />
      </div>
    </div>
    <!-- Campo para escribir mensaje -->
    <div class="row">
      <div class="col-sm-12 q-pa-xs" style="border: 1px solid #202c33;">
        <q-input
          color="primary"
          filled
          v-model="chatMessage"
          placeholder="Escribe un mensaje"
          @keydown.enter.prevent="sendMessage"
        >
          <template v-slot:append>
            <q-icon name="send" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { $randomText } from 'src/commons/utils'
// import { useAuthStore } from 'stores/use-auth-store'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ChatView',
  setup() {
    // const { getUser } = useAuthStore()
    const chatMessage = ref('')

    const mockChats = []
    for (let index = 0; index < 5; index++) {
      mockChats.push(
        {
          userName: $randomText(5),
          text: [$randomText(15)],
          sent: true
        }
      )
    }

    const chatEntities = reactive(mockChats)

    const sendMessage = () => {
      const msg = chatMessage.value
      if (msg === '') {
        return false
      }
      chatEntities.push(
        {
          userName: 'Yolo',
          text: [chatMessage.value],
          sent: true
        }
      )
      chatMessage.value = ''
    }

    return {
      // getUser
      chatMessage,
      chatEntities,
      sendMessage
    }
  }
})
</script>
