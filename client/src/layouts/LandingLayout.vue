<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <main class="hero d-flex flex-column">
    <section class="container">
      <nav-bar />

      <div class="hero-content text-white">
        <div class="details">
          <router-view />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.hero {
  position: relative;
  height: 100vh;
  background-image: url("@/assets/images/hero_bg.jpg");
  background-size: cover;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6); // dark overlay
    backdrop-filter: blur(5px); // blur only the background
    z-index: 1;
  }

  .navbar,
  .hero-content {
    position: relative; // bring content above overlay
    z-index: 2;
  }

  .hero-content {
    display: flex;
    justify-content: center;
    text-align: center;
    height: 80vh;

    .details {
      max-width: 600px;
      margin: auto;
    }
  }
}
</style>
