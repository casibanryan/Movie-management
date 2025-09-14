import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movieStore', () => {
  const movie = ref({})
  const movies = ref([])

  async function store (payload, onProgress) {
    const { data } = await api.post('/v1/movies', payload, {
      headers: {
      'Content-Type': 'multipart/form-data',
      },
       onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(progressEvent);
        }
      },
    })
    movie.value = data.movie
    return data
  }

  async function softDelete (id) {
    const { data } = await api.delete(`/v1/movies/${id}`)
    movie.value = {}
    return data
  }

  return { 
    movie,
    movies,
    store,
    softDelete
   }
})
