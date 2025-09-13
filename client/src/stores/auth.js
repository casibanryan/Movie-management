import { ref } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'

export const useAuthStore = defineStore('authStore', () => {
  const auth = ref({})

  const isLogin = () => !_.isEmpty(auth.value)

  return {
    auth,
    isLogin
  }
})
