import { createRouter, createWebHistory } from 'vue-router'
import LandingLayout from '@/layouts/LandingLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'

import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import ActionView from '@/views/ActionView.vue'
import PlayView from '@/views/PlayView.vue'
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
        {
          path: 'action/:id?',
          component: ActionView,
          name: 'action'
        }
      ]
    },

    {
      path: '/play/:id',
      component: PlayView ,
      name: 'play',
      meta: {
        auth: true
      },
    }
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
