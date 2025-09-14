import { useMovieStore } from "@/stores/movie"
export default () => {
  const movieStore = useMovieStore()

  async function handleUpload (payload) {
    try {
      const formData = new FormData()

      formData.append('video_file', payload.video_file)
      formData.append('title', payload.title)
      formData.append('description', payload.description)

      const result = await movieStore.store(formData)
     
      return result
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }

  return {
    handleUpload
  }
}