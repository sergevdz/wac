<template>
  <div class="row justify-center">
    <div class="col-12 col-md-12 text-center">
      <h2>Crear usuario</h2>
    </div>
    <div class="col-12 col-md-auto">
      <div class="column">
        <div class="col col-md-3">
          <q-input v-model="userData.name" label="Nombre" />
        </div>
        <div class="col col-md-3">
          <q-input v-model="userData.email" label="Email" />
        </div>
        <div class="col col-md-9">
          <q-input v-model="userData.password" label="Contraseña" type="password" />
        </div>
        <div class="col col-md-9">
          <q-btn
            color="black"
            class="full-width"
            label="Registrar"
            @click="onSignIn"
          />
          <br>
          <br>
          <q-btn
            color="red"
            class="full-width"
            label="Atras"
            @click="goBack"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import { defineProps } from 'vue'
import api from '../api'
const emit = defineEmits(['goBack'])

// const props = defineProps({
//   isModalActive: Boolean,
// })

const userData = reactive({
  name: null,
  email: null,
  password: null
})

const goBack = () => {
  emit('goBack', false)
}

const onSignIn = async () => {
  const user = await api.auth.signin(userData)
  if (user) {
    goBack()
  }
}

</script>
