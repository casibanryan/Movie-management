<script setup>
import { ref } from "vue";

const email = ref("test@yahoo.com");
const password = ref("");
const rememberMe = ref(false);

const handleSignIn = () => {
  console.log("Signing in with:", {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>

<template>
  <div class="netflix-login-form p-5 rounded">
    <h1 class="text-white mb-4">Sign In</h1>
    <form @submit.prevent="handleSignIn">
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control bg-transparent text-white"
          id="email"
          placeholder="name@example.com"
          v-model="email"
          required
        />
        <label for="email">Email or mobile number</label>
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
