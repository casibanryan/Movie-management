<script setup>
import { ref } from "vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import InfoIcon from "@/components/icons/InfoIcon.vue";

const topMovie = ref({
  title: "It's Okay to Not Be Okay",
  description:
    "An author with severe antisocial tendencies learns to confront her deep emotional wounds when she meets a stranger who challenges her cold facade.",
  date_added: 6,
  image:
    "https://occ-0-1763-325.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbxJnLLfEM9dVg8xWFrXMbLtYKhqQ4h2C5pXAPg86Y5dhZm23NAYKYsEIyQaGUgxs40hMUXWdg9h_anweCIE6fdTZ4gRV9P2iZnS.webp?r=e86",
});
</script>

<template>
  <div
    class="hero-section text-white position-relative d-flex align-items-center"
    :style="{
      backgroundImage: `url(${topMovie.image})`,
    }"
  >
    <div class="container">
      <section class="info">
        <h1 class="display-4 fw-bold">{{ topMovie.title }}</h1>

        <div class="d-flex align-items-center gap-2 my-2">
          <span class="badge bg-danger">{{ topMovie.date_added }}</span>
        </div>

        <p class="hero-description my-3">{{ topMovie.description }}</p>

        <div class="d-flex gap-2">
          <button class="btn btn-light btn-lg align-items-center">
            <PlayIcon class="text-lg" />
            Play
          </button>
          <button class="btn btn-secondary btn-lg align-items-center">
            <InfoIcon /> More Info
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-section {
  background-blend-mode: multiply;
  color: #fff;
  padding: 2rem 0;
  height: 80vh;
  background-size: cover;
  background-position: center;

  .info {
    max-width: 30vw;

    .btn {
      min-width: 120px;
      border-radius: 4px;
    }
  }
}
</style>
