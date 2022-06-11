import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
// import { responseBody } from 'src/commons/request'
import api from '../api'
// import request from '../commons/request'

interface User {
  id: number;
  email: string;
}

interface Auth {
  user: User;
  wasLoaded: bolean;
}

export const useAuthStore = defineStore({
  id: 'authStore', // Required

  state: (): Auth => ({
    user: null as User,
    wasLoaded: false as boolean
  }),

  getters: {
    getUser: (state) => state.user,
    getWasLoaded: (state) => state.wasLoaded
  },

  actions: {
    logIn: async (email: string, password: string) => {
      try {
        const params = { email, password }
        delete axios.defaults.headers.common['Authorization']
        const authLogin = await api.auth.login(params)
        if (authLogin) {
          const jwt = authLogin?.jwt
          localStorage.setItem('jwt', jwt)
          axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
        }
        return authLogin
      } catch (error) {
        console.error(error)
      }
    },
    async getProfile() {
      const response = await api.auth.getProfile()
      if (response) {
        this.user = response.data
        this.wasLoaded = true
      }
      return response
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
