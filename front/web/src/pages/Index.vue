<template>
  <q-layout>
    <q-page-container class="" style="overflow-y: auto">
      <div class="row q-pa-md" style="height: calc( 100% - 138px);max-height: calc( 100% - 138px)">
        <chat-panel v-model="chatId" />
        <chat-view :key="chatId" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
import ChatPanel from 'src/components/ChatPanel.vue'
import ChatView from 'src/components/ChatView.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  components: {
    ChatPanel,
    ChatView
  },
  setup() {
    const chatId = ref(-1)

    return {
      chatId
    }
  }
})
</script>
