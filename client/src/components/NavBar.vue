<script setup>
import NetfixIcon from "@/components/icons/NetfixIcon.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const goToLogin = () => router.push({ name: "login" });

function handleHome() {
  if (authStore.isLogin()) {
    return router.push({
      name: "home",
    });
  }

  return router.push({
    name: "landingPage",
  });
}
</script>

<template>
  <nav class="navbar navbar-expand-sm px-4 py-3">
    <a class="navbar-brand" href="javascript:void(0)" @click="handleHome">
      <netfix-icon class="text-danger" />
    </a>

    <div class="ms-auto">
      <button @click="goToLogin" class="btn btn-danger btn-sm">Sign in</button>
    </div>
  </nav>
</template>
