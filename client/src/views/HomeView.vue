<script setup>
import { onMounted, computed } from 'vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import MovieSlider from '@/components/MovieSlider.vue'
import { useMovieStore } from '@/stores/movie'
import _ from 'lodash'
import { useRouter } from 'vue-router'
import DetailModal from '@/components/DetailModal.vue'
import { Modal } from 'bootstrap'
import useMovie from '@/composables/useMovie'

const router = useRouter()
const movieStore = useMovieStore()
const { notifyUploadFirst } = useMovie()

onMounted(async () => {
  await movieStore.getMovies()

  if (!movieStore.movies || _.isEmpty(movieStore.movies.data)) {
    notifyUploadFirst()
  }
})

const topMovie = computed(() => {
  const temp = _.first(_.get(movieStore.movies, 'data', {}))

  if (_.isEmpty(temp)) {
    return temp
  }

  return {
    ...temp,
    image: import.meta.env.VITE_STATIC_ASSET_PATH + `thumbnails/${temp.id}.jpg`,
  }
})

const movies = computed(() => {
  const list = _.get(movieStore.movies, 'data', [])
  return _.map(list, (item) => {
    return {
      ...item,
      image: import.meta.env.VITE_STATIC_ASSET_PATH + `thumbnails/${item.id}.jpg`,
    }
  })
})

function goToPlay(id) {
  router.push({
    name: 'play',
    params: {
      id: id,
    },
  })
}

function viewInfo(data) {
  movieStore.movie = data
  const netflixModal = new Modal(document.getElementById('netflixModal'))
  netflixModal.show()
}
</script>

<template>
  <div class="mb-5">
    <div
      v-if="!_.isEmpty(topMovie)"
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
            <button class="btn btn-light btn-lg align-items-center" @click="goToPlay(topMovie.id)">
              <PlayIcon class="text-lg" />
              Play
            </button>
            <button class="btn btn-secondary btn-lg align-items-center" @click="viewInfo(topMovie)">
              <InfoIcon /> More Info
            </button>
          </div>
        </section>
      </div>
    </div>

    <section v-if="!_.isEmpty(movies)" class="container-fluid">
      <movie-slider :movies="movies" />
    </section>
  </div>

  <detail-modal @play="goToPlay" />
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
