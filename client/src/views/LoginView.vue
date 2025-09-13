<script setup>
import useAuth from "@/composables/useAuth";
const { handleLogin, email, password, rememberMe, isErrorLogin } = useAuth();

const closeErrorMsg = () => (isErrorLogin.value = null);
</script>

<template>
  <div class="netflix-login-form p-5 rounded">
    <h1 class="text-white mb-4">Sign In</h1>
    <div v-if="isErrorLogin" class="alert alert-warning alert-dismissible" role="alert">
      {{ isErrorLogin }}
      <button type="button" class="btn-close" @click="closeErrorMsg"></button>
    </div>
    <form @submit.prevent="handleLogin">
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control bg-transparent text-white"
          id="email"
          placeholder="name@example.com"
          v-model="email"
          required
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control bg-transparent text-white"
          id="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="password">Password</label>
      </div>

      <button type="submit" class="btn btn-danger w-100 py-3 mb-3">Sign In</button>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="rememberMe"
            v-model="rememberMe"
          />
          <label class="form-check-label text-white-50" for="rememberMe">
            Remember me
          </label>
        </div>
      </div>

      <div class="text-white-50 mb-3 mt-4">
        New to Netflix?
        <a href="#" class="text-white text-decoration-none fw-bold">Sign up now.</a>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.netflix-login-form {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  min-width: 450px;
}
</style>
