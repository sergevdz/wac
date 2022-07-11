<template>
  <q-dialog v-model="canShowModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Agregar contacto</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore. -->
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
        <q-btn flat label="Agregar" color="primary" @click="addContacts" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue'
import api from 'src/api'
export default defineComponent({
  name: 'SearchContactsModal',
  props: ['show'],
  emits: ['close'],
  setup(props, ctx) {
    const filterUserName = ref('')

    const closeModal = () => {
      filterUserName.value = ''
      contactsToSelect.value = []
      ctx.emit('close')
    }

    const canShowModal = computed(() => {
      return props.show
    })

    const contactsToSelect = ref([])

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

    const addContacts = () => {
      const selectedContactIds = contactsToSelect.value.reduce((arr, cToS) => {
        if (cToS.isSelected) {
          arr.push(cToS.user._id)
          return arr
        }
      }, [])
      const params = {
        contactIds: selectedContactIds
      }
      api.users.addContacts(params)
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
