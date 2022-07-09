<template>
  <q-dialog v-model="canShowModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        <q-input
          v-model="contacts.filter"
          type="text"
          label="Buscar"
          @keyup="onInputSearchUsers"
        />
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="(usr, idx) in contacts.users" :key="idx">
            <q-item-section>
              <span style="font-weight:bold;">{{ usr.name }}</span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <!-- <q-btn flat label="OK" color="primary" v-close-popup /> -->
        <q-btn flat label="OK" color="primary" @click="closeModal" />
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

    const closeModal = () => {
      ctx.emit('close')
    }

    const canShowModal = computed(() => {
      return props.show
    })

    const contacts = reactive({
      users: [],
      filter: ''
    })

    const getAllUsers = async () => {
      const params = {
        excludingMe: 1,
        userName: contacts.filter
      }
      contacts.users = await api.users.getAll(params)
    }

    const onInputSearchUsers = async () => {
      console.log(contacts.filter)
      // TODO - Poner un timer de 200ms
      await getAllUsers()
    }

    return {
      closeModal,
      canShowModal,
      contacts,
      onInputSearchUsers
    }
  }
})
</script>
