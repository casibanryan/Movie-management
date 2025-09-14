<script setup>
import { defineProps } from 'vue'

defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Movies',
  },
})


</script>

<template>
  <div class="container-fluid py-3">
    <h5 class="text-white mb-3">
      {{ title }}
    </h5>

    <div id="movieSlider" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(chunk, index) in Math.ceil(movies.length / 4)"
          :class="{ active: index === 0 }"
          :key="index"
        >
          <div class="row">
            <div
              class="col-3"
              v-for="movie in movies.slice(index * 4, index * 4 + 4)"
              :key="movie.id"
            >
              <a href="javascript:void(0)" class="card bg-dark text-white border-0" @click.stop="$emit('onClick', movie)">
                <img :src="movie.image" class="card-img" alt="thumbnail" />
                <div class="card-img-overlay d-flex flex-column justify-content-end">
                  <h6 class="card-title">{{ movie.title }}</h6>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#movieSlider"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#movieSlider"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  .card:hover {
    transform: scale(1.05);
  }
  .card-img-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }

  .card-img {
    height: 100px;
    width: 100%;
  }

  
}
.carousel-control-prev {
  left: -100px;
  &:hover {
    z-index: 10;
  }
}

.carousel-control-next {
  right: -100px;
  &:hover {
    z-index: 10;
  }
}
</style>
