<template>
  <q-card class="debug-blue">
    <q-card-section>
      <div class="text-h6">Iniciar nuevo chat</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        v-model="filterUserName"
        type="text"
        placeholder="Escriba un nombre de usuario"
        @keyup="onInputSearchUsers"
      />
      <q-list bordered separator style="max-height: 50vh">
        <q-item
          clickable
          v-ripple
          v-for="(cToS, idx) in usersToSelect"
          :key="idx"
          @click="cToS.isSelected = !cToS.isSelected"
        >
          <q-item-section side top>
            <q-checkbox v-model="cToS.isSelected" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ cToS.user.name }}</q-item-label>
            <!-- <q-item-label caption>
              {{ cToS.user.email }}
            </q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="primary" @click="cancelStartNewChat" />
      <q-btn flat label="Iniciar" color="primary" @click="startNewChat" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import api from 'src/api'
import { Room } from 'src/core/types/types'
// type Room = {
//   _id: string,
//   name: string,
//   messages: [],
// }

type User = {
  _id: string
}

type SelectContact = {
  isSelected: boolean,
  user: User
}

export default defineComponent({
  name: 'StartNewChat',
  emits: ['cancelStartNewChat', 'setNewChat', 'reloadChats'],
  setup(props, ctx) {
    const filterUserName = ref('')
    const usersToSelect: Ref<SelectContact[]> = ref([])

    const getAllUsers = async () => {
      if (filterUserName.value) {} else {
        return []
      }
      const params = { excludingMe: 1, userName: filterUserName.value }
      return api.users.getAll(params) || []
    }

    const loadUsers = async () => {
      const users = await getAllUsers()
      if (users) {
        usersToSelect.value = []
        users.forEach((user: User) => {
          usersToSelect.value.push({ isSelected: false, user: user })
        })
      }
    }

    const onInputSearchUsers = async () => {
      // TODO - Poner un timer de 200ms
      await loadUsers()
    }

    const startNewChat = async () => {
      const selectedUserIds = usersToSelect.value
        .filter(val => val.isSelected)
        .reduce<Array<string>>((opt, val) => {
          opt.push(val.user._id)
          return opt
        }, [])
      const params = {
        userIds: selectedUserIds
      }
      const room: Room = await api.chatRooms.startNewChat(params)
      ctx.emit('reloadChats')
      ctx.emit('setNewChat', room)
      ctx.emit('cancelStartNewChat')
    }

    const cancelStartNewChat = () => {
      ctx.emit('cancelStartNewChat')
    }

    return {
      filterUserName,
      onInputSearchUsers,
      usersToSelect,
      startNewChat,
      cancelStartNewChat
    }
  }
})
</script>
