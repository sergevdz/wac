<template>
    <div class="col-sm-4">
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
        <div class="row">
        <div class="col-sm-12" style="border: 1px solid #202c33;border-top: 0px">
          <q-scroll-area style="height: 500px">
            <q-list>
              <q-item clickable @click="showThisChat(1)">
                <q-item-section top avatar>
                    <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Nombre chat</q-item-label>
                    <q-item-label caption>Último mensaje enviado</q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="fa fa-volume-mute" size="18px" />
                </q-item-section>
                </q-item>

              <q-item clickable @click="showThisChat(2)">
                <q-item-section top avatar>
                    <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Nombre chat</q-item-label>
                    <q-item-label caption>Último mensaje enviado</q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="fa fa-volume-mute" size="18px" />
                </q-item-section>
                </q-item>

                <q-item clickable @click="showThisChat(3)">
                <q-item-section top avatar>
                    <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Nombre chat</q-item-label>
                    <q-item-label caption>Último mensaje enviado</q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="fa fa-volume-mute" size="18px" />
                </q-item-section>
                </q-item>

            </q-list>
            </q-scroll-area>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ChatPanel',
  props: {
    modelValue: Number
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const modelValue = ref(props.modelValue)

    const showThisChat = (chatId: number) => {
      modelValue.value = chatId
      ctx.emit('update:modelValue', modelValue.value)
    }

    return {
      showThisChat
    }
  }
})
</script>
