import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movieStore', () => {
  const movie = ref({})
  const movies = ref([])

  async function store (payload) {
    const { data } = await api.post('/v1/movies', payload, {
      headers: {
      'Content-Type': 'multipart/form-data',
      },
    })
    return data
  }

  return { 
    movie,
    movies,
    store
   }
})
