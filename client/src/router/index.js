import { createRouter, createWebHistory } from 'vue-router'
import LandingLayout from '@/layouts/LandingLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'

import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

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

export default router
