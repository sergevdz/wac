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
    // Validar si user esta logeado
    // const $router = useRouter()
    // $router.push('/login')
  }
})
</script>
