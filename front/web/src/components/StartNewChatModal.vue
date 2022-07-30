<template>
  <q-dialog v-model="canShowModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Iniciar nuevo chat</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="filterUserName"
          type="text"
          label="Buscar"
          @keyup="onInputSearchUsers"
        />
        <q-list bordered separator style="max-height: 50vh">
          <q-item
            clickable
            v-ripple
            v-for="(cToS, idx) in contactsToSelect"
            :key="idx"
            @click="cToS.isSelected = !cToS.isSelected"
          >
            <q-item-section side top>
              <q-checkbox v-model="cToS.isSelected" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ cToS.user.name }}</q-item-label>
              <q-item-label caption>
                {{ cToS.user.email }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="closeModal" />
        <q-btn flat label="Iniciar" color="primary" @click="addContacts" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, Ref } from 'vue'
import api from 'src/api'
interface User {
  _id: string
}

interface SelectContact {
  isSelected: boolean,
  user: User
}
export default defineComponent({
  name: 'StartNewChatModal',
  props: ['show'],
  emits: ['close'],
  setup(props, ctx) {
    const filterUserName = ref('')
    const contactsToSelect: Ref<SelectContact[]> = ref([])

    const closeModal = () => {
      filterUserName.value = ''
      contactsToSelect.value = []
      ctx.emit('close')
    }

    const canShowModal = computed(() => {
      return props.show
    })

    const getAllUsers = async () => {
      if (filterUserName.value) {} else {
        return []
      }
      const params = { excludingMe: 1, userName: filterUserName.value }
      return api.users.getAll(params)
    }

    const loadContacts = async () => {
      const users = await getAllUsers()
      if (users) {
        contactsToSelect.value = []
        users.forEach(user => {
          contactsToSelect.value.push({ isSelected: false, user: user })
        })
      }
    }

    const onInputSearchUsers = async () => {
      // TODO - Poner un timer de 200ms
      await loadContacts()
    }

    const addContacts = async () => {
      const selectedContactIds = contactsToSelect.value
        .filter(val => val.isSelected)
        .reduce((opt, val) => {
          opt.push(val.user._id)
          return opt
        }, [])
      const params = {
        userIds: selectedContactIds
      }
      const result = await api.chatRooms.startNewRoom(params)
      closeModal()
    }

    return {
      closeModal,
      canShowModal,
      filterUserName,
      onInputSearchUsers,
      contactsToSelect,
      addContacts
    }
  }
})
</script>
