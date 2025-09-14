<script setup>
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movie'
import BackIcon from '@/components/icons/BackIcon.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

watch(
  () => route.params?.id,
  async (val) => {
    if (!val) {
      return false
    }

    await movieStore.get(val)
  },
  {
    immediate: true,
  },
)

const backHome = () => router.push({ name: 'home' })
const movie = computed(() => {
  const data = movieStore.movie
  return {
    ...data,
    video_file: import.meta.env.VITE_STATIC_ASSET_PATH + data.video_file,
  }
})
</script>

<template>
  <main class="play-container">
    <back-icon class="back-icon" @click.stop="backHome" />
    <video :src="movie.video_file" controls full-screen></video>
  </main>
</template>

<style lang="scss" scoped>
.play-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  video {
    width: 100%;
    height: 100vh;
  }

  .back-icon {
    background: none;
    position: absolute;
    top: 20px;
    color: #fff;
    z-index: 2;
    left: 20px;
  }
}
</style>
