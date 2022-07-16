<template>
  <router-view />
</template>

<script setup lang="ts">
// import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { axios } from 'boot/axios'
import { useAuthStore } from 'src/stores/use-auth-store'
import api from 'src/api'

// export default defineComponent({
//   name: 'App',
//   setup() {
const $router = useRouter()
/* try { */
const logOut = () => {
  localStorage.removeItem('jwt')
  // location.reload()
  $router.push('/login')
}
const tryToLoad = async () => {
  const jwt = localStorage.getItem('jwt')
  const jwtExists = Boolean(jwt)
  if (jwtExists) {
    const { storeUser } = useAuthStore()
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
    const loggedUser = await api.users.getLoggedUser()
    if (loggedUser) {
      storeUser(loggedUser)
      $router.push('/')
    } else {
      logOut()
      throw new Error('No se encontró el usuario')
    }
  } else {
    logOut()
    throw new Error('No se encontró el token')
  }
}
tryToLoad()
/* } catch (error) {
  console.log(error)
  localStorage.removeItem('jwt')
  // location.reload()
  $router.push('/login')
} */
//   }
// })
</script>
