<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const email = ref(null)

function handleSubscribe () {
  router.push({
    name: 'login',
    query: {
      email: email.value
    }
  });
}
</script>

<template>
  <section>
    <h1 class="display-4 fw-bold mb-3">Unlimited movies, TV shows, and more.</h1>
    <p class="lead mb-4">Watch anywhere. Cancel anytime.</p>
    <div class="d-flex justify-content-center gap-2 gap-md-3 w-100 flex-wrap needs-validations">
      <div class="form-floating flex-fill">
        <input
          type="email"
          class="form-control bg-transparent text-white"
          id="emailInput"
          placeholder="test@yahoo.com"
          v-model="email"
        />
        <label for="emailInput text-white">Email address</label>
      </div>
      <button class="btn btn-danger" @click="handleSubscribe">Get Started</button>
    </div>
  </section>
</template>
