import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('authStore', () => {
  const auth = ref({})

  const isLogin = () => !_.isEmpty(auth.value)
    const showModal = inject("showModal");

  async function login (payload = {}) {
    const { data } = await api.post('/v1/auth/login', { ...payload })
    return data
  }

  async function logout () {
    const { data } = await api.post('/v1/auth/logout')
    return data
  }

  async function get () {
    try {
      const { data } = await api.get('/v1/auth/me')
      auth.value = data
      return data
    } catch (e) {
      auth.value = {}
      localStorage.removeItem('token')
      showModal({
        title: "Session Expired",
        body: "Please login again.",
        primaryText: "Ok",
        primaryClass: "btn-danger",
        secondaryBtn: false
      })
      throw e
    }
  }

  return {
    auth,
    isLogin,
    login,
    get,
    logout
  }
})
