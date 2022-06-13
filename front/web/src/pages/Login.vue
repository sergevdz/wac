<template>
  <q-layout>
    <q-page-container style="background-color: #769fcd">
      <q-page>
        <sign-in v-if="canSignIn" @goBack="toggleShowSigIn($event)" />
        <div v-else class="row justify-center">
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
                <br>
                <br>
                <q-btn
                  color="orange"
                  class="full-width"
                  label="Crear usuario"
                  @click="toggleShowSigIn(true)"
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
import SignIn from 'src/components/SignIn.vue'
import api from 'src/api'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  beforeRouteEnter: (to, from, next) => {
    const jwt = localStorage.getItem('jwt')
    const jwtExists = Boolean(jwt)
    if (jwtExists) {
      next('/')
    } else {
      // Se queda en LOGIN
      next()
    }
  },
  components: {
    SignIn
  },
  setup() {
    const $router = useRouter()
    const email = ref(process.env.USER_MAGIC_EMAIL)
    const password = ref(process.env.USER_MAGIC_PASSWORD)
    const { storeUser, storeToken } = useAuthStore()

    let loading = ref(false)

    let canSignIn = ref(false) // No se necesita que sea reactiva. PRUBA

    const toggleShowSigIn = (toggle: boolean) => {
      canSignIn.value = toggle
    }

    const onlogIn = async () => {
      try {
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

        const params = { email: email.value, password: password.value }
        const authLogin = await api.auth.login(params)
        if (authLogin) {
          storeUser(authLogin?.user)
          storeToken(authLogin?.authorization)
          $router.push('/')
        }
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      onlogIn,
      loading,
      toggleShowSigIn,
      canSignIn
    }
  }
})
</script>
