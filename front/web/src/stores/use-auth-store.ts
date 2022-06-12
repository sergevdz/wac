import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import api from '../api'

interface User {
  _id: number;
  name: string;
  email: string;
}

interface Auth {
  user: User;
  token: string;
}

export const useAuthStore = defineStore({
  id: 'authStore', // Required

  state: (): Auth => ({
    user: null as User,
    token: null as string
  }),

  getters: {
    getUser: (state) => state.user
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
      }
      return response
    }
    // async saveUser(user: User) {
    //   this.user = user
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
