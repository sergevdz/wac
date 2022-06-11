<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { axios } from 'boot/axios'
import { useAuthStore } from 'src/stores/use-auth-store'

export default defineComponent({
  name: 'App',
  setup() {
    const $router = useRouter()
    const { getProfile } = useAuthStore()

    const jwt = localStorage.getItem('jwt')
    const jwtExists = Boolean(jwt)
    if (jwtExists) {
      // Validar que el token sea válido y vigente cargando el perfil
      axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
      getProfile()
        .then(() => {
          // Se queda en la ruta
        })
        .catch((error) => {
          // Redirige a login
          console.error(error)
          localStorage.removeItem('jwt')
          location.reload()
        })
    } else {
      $router.push('/login')
    }
  }
})
</script>
