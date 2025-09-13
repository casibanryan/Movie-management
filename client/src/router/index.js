import { createRouter, createWebHistory } from 'vue-router'
import LandingLayout from '@/layouts/LandingLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'

import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LandingLayout,
      children: [
        {
          path: '',
          component: LandingView,
          name: 'landingPage'
        },
         {
          path: '/sign-in',
          component: LoginView,
          name: 'login'
        }
      ]
    },
     {
      path: '/home',
      component: HomeLayout,
      meta: {
        auth: true
      },
      children: [
        {
          path: '',
          component: HomeView,
          name: 'home'
        },
      ]
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token') 

  if (to.meta?.auth && !token) {
    return next({ name: 'login' })
  } 

  if (to.meta?.auth && token) {
    const authStore = useAuthStore()
    await authStore.get()
  }
  
  next()
})

export default router
