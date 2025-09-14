import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movieStore', () => {
  const movie = ref({})
  const movies = ref([])

  async function store(payload, onProgress) {
    const { data } = await api.post('/v1/movies', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(progressEvent)
        }
      },
    })
    movie.value = data.movie
    return data
  }

  async function softDelete(id) {
    const { data } = await api.delete(`/v1/movies/${id}`)
    movie.value = {}
    return data
  }

  async function get(id) {
    const { data } = await api.get(`/v1/movies/${id}`)
    movie.value = data
    return data
  }

  async function update(id, payload, onProgress) {
    const { data } = await api.post(`/v1/movies/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(progressEvent)
        }
      },
    })
    movie.value = data.movie
    return data
  }

  async function getMovies() {
    const { data } = await api.get(`/v1/movies`)
    movies.value = data
    return data
  }

  return {
    movie,
    movies,
    store,
    softDelete,
    get,
    update,
    getMovies,
  }
})
