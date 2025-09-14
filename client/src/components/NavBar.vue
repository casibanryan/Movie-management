<script setup>
import NetfixIcon from '@/components/icons/NetfixIcon.vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Avatar1 from '@/assets/images/avatar-1.jpg'
import useAuth from '@/composables/useAuth'
const { handleLogout } = useAuth()

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const goToLogin = () => router.push({ name: 'login' })
const goToCreate = () => router.push({ name: 'action' })

function handleHome() {
  if (authStore.isLogin()) {
    return router.push({
      name: 'home',
    })
  }

  return router.push({
    name: 'landingPage',
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-sm px-4 py-3">
    <a class="navbar-brand" href="javascript:void(0)" @click="handleHome">
      <netfix-icon class="text-danger" />
    </a>

    <div class="ms-auto actions">
      <button v-if="!authStore.isLogin()" @click="goToLogin" class="btn btn-danger btn-sm">
        Sign in
      </button>

      <div v-else class="d-flex gap-2">
        <button v-if="!route.params.id" class="btn btn-danger btn-sm" @click="goToCreate">
          Create
        </button>
        <a
          href="javascript:void(0)"
          class="btn btn-transparent avatar"
          @click="handleLogout"
          title="logout"
        >
          <img :src="Avatar1" alt="avatar" height="20" width="20" />
        </a>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  overflow: visible;
  position: relative;

  .actions {
    position: relative;
    .avatar {
      padding: 0px;
      margin: 0px;
      img {
        height: 30px;
        width: 30px;
        border-radius: 4px;
      }
    }
  }
}
</style>
