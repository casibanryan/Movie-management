import { ref } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('authStore', () => {
  const auth = ref({})

  const isLogin = () => !_.isEmpty(auth.value)

  async function login(payload = {}) {
    const { data } = await api.post('/v1/auth/login', { ...payload })
    return data
  }

  async function logout() {
    const { data } = await api.post('/v1/auth/logout')
    return data
  }

  async function get() {
    try {
      const { data } = await api.get('/v1/auth/me')
      auth.value = data
      return data
    } catch (e) {
      auth.value = {}
      localStorage.removeItem('token')
      throw e
    }
  }

  return {
    auth,
    isLogin,
    login,
    get,
    logout,
  }
})
