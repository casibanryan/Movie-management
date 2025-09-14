import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import _ from 'lodash'

export default () => {
  const authStore = useAuthStore()
  const email = ref(localStorage.getItem('email') || '')
  const password = ref('')
  const rememberMe = ref(false)
  const isErrorLogin = ref(null)
  const router = useRouter()

  async function handleLogin() {
    try {
      const result = await authStore.login({
        email: email.value,
        password: password.value,
      })
      localStorage.setItem('token', result.access_token)
      if (rememberMe.value) {
        localStorage.setItem('email', email.value)
      } else {
        localStorage.removeItem('email')
      }
      router.push({
        name: 'home',
      })
    } catch (e) {
      isErrorLogin.value = _.get(e.response, 'data.error', 'Invalid')
      throw e
    }
  }

  async function handleLogout() {
    try {
      await authStore.logout()
      authStore.auth = {}
      localStorage.removeItem('token')
      router.push({
        name: 'landingPage',
      })
    } catch (e) {
      console.error(e.message)
      throw e
    }
  }

  return {
    handleLogin,
    email,
    password,
    rememberMe,
    isErrorLogin,
    handleLogout,
  }
}
