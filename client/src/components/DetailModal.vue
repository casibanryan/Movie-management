<script setup>
import SettingIcon from '@/components/icons/SettingIcon.vue'
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movie'

const movieStore = useMovieStore()
const movie = computed(() => movieStore.movie)
</script>

<template>
  <div
    class="modal fade netflix-modal"
    id="netflixModal"
    tabindex="-1"
    aria-labelledby="netflixModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <!-- Background video or image -->
        <div class="modal-hero">
          <img :src="movie.image" class="w-100" alt="thumbnail" />
          <div class="overlay"></div>

          <!-- Title + Controls -->
          <div class="modal-hero-content">
            <h1 class="movie-title">{{ movie.title }}</h1>
            <div class="actions">
              <button class="btn btn-danger me-2" @click="$.emit('play', movie.id)">Play</button>
              <button class="btn btn-outline-light me-2">
                <setting-icon />
              </button>
            </div>
          </div>
        </div>

        <div class="modal-body">
          <div class="d-flex flex-wrap">
            <div class="col-md-8">
              <p>
                <strong>{{ movie.date_added }}</strong>
              </p>
              <p>{{ movie.description }}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.netflix-modal {
  .modal-content {
    background: #141414;
    color: #fff;
    border: none;
    border-radius: 0;
  }

  .modal-hero {
    position: relative;

    img {
      max-height: 400px;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #141414, transparent);
    }

    .modal-hero-content {
      position: absolute;
      bottom: 20px;
      left: 20px;

      .movie-title {
        font-size: 2rem;
        font-weight: bold;
      }

      .actions {
        margin-top: 10px;

        .btn {
          border-radius: 0.25rem;
        }
      }
    }
  }

  .modal-body {
    padding: 20px;
    font-size: 0.9rem;
  }
}
</style>
