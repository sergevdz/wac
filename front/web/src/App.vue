<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { axios } from 'boot/axios'
import { useAuthStore } from 'src/stores/use-auth-store'
import api from 'src/api'

const $router = useRouter()

const logOut = () => {
  localStorage.removeItem('jwt')
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
</script>
