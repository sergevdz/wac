<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { axios } from 'boot/axios'
import { useAuthStore } from 'src/stores/use-auth-store'
import api from 'src/api'
export default defineComponent({
  name: 'App',
  setup() {
    const tryToLoad = async () => {
      const $router = useRouter()
      const jwt = localStorage.getItem('jwt')
      const jwtExists = Boolean(jwt)

      if (jwtExists) {
        const { storeUser } = useAuthStore()
        axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
        console.log(axios.defaults.headers.common)
        const loggedUser = await api.auth.getLoggedUser()
        if (loggedUser) {
          storeUser(loggedUser)
          $router.push('/')
        } else {
          localStorage.removeItem('jwt')
          // location.reload()
          $router.push('/login')
        }
      } else {
        localStorage.removeItem('jwt')
        // location.reload()
        $router.push('/login')
      }
    }
    tryToLoad()
  }
})
</script>
