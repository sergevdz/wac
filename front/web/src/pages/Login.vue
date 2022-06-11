<template>
  <q-layout>
    <q-page-container style="background-color: #769fcd">
      <q-page>
        <div class="row justify-center">
          <div class="col-12 col-md-12 text-center">
            <h2>Login</h2>
          </div>
          <div class="col-12 col-md-auto">
            <div class="column">
              <div class="col col-md-3">
                <q-input v-model="email" label="Email" />
              </div>
              <div class="col col-md-9">
                <q-input v-model="password" label="Password" type="password" />
              </div>
              <div class="col col-md-9">
                <q-btn
                  color="black"
                  class="full-width"
                  label="Enter"
                  @click="onlogIn"
                  :loading="loading"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $notify } from 'src/commons/utils'
import { useAuthStore } from 'src/stores/use-auth-store'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  beforeRouteEnter: async (to, from, next) => {
    const jwt = localStorage.getItem('jwt')
    const jwtExists = Boolean(jwt)

    if (jwtExists) {
      next('/dashboard')
    } else {
      // Se queda en LOGIN
      next()
    }
  },
  setup() {
    const $router = useRouter()
    const email = ref(process.env.USER_MAGIC_EMAIL)
    const password = ref(process.env.USER_MAGIC_PASSWORD)
    // const auth = useAuthStore()
    const { getProfile, logIn } = useAuthStore()

    let loading = ref(false)

    const onlogIn = async () => {
      if (email.value) {
      } else {
        $notify('Por favor ingrese su email', 'warning')
        return false
      }
      if (password.value) {
      } else {
        $notify('Por favor ingrese su contraseña', 'warning')
        return false
      }
      loading.value = true

      await logIn(email.value, password.value)
        .then( async response => {
          if (response) {
            await getProfile().then(() => {
              $router.push('/dashboard')
            })
          }
        })
        .catch((error) => error)
      loading.value = false
    }

    return {
      email,
      password,
      onlogIn,
      loading
    }
  }
})
</script>
