import { useMovieStore } from "@/stores/movie"
import { ref, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import _ from 'lodash'

export default () => {
  const movieStore = useMovieStore()

  const router = useRouter()
  const route = useRoute()

  const file = ref(null);
  const uploadProgress = ref(0); 
  const isUploading = ref(false);
  const toast = useToast();
  const isSuccess = ref(false)

  const showModal = inject("showModal");

  async function handleUpload (event) {
    const form = event.target
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
      return
    }


    isUploading.value = true;
    uploadProgress.value = 0;
    
    try {
      const formData = new FormData()

      if (file.value.video_file) {
        formData.append('video_file', file.value.video_file)
      }
      formData.append('title', file.value.title)
      formData.append('description', file.value.description)

      let result;

      if (route.params.id) {
        formData.append('_method', 'PUT')
         result = await movieStore.update(route.params.id, formData, progressEvent => {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        })
      } else {
         result = await movieStore.store(formData, progressEvent => {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        })
      }

      toast.success(result.message);
      isSuccess.value = true
      form.classList.add('was-validated');
      router.replace({
        params: {
          id: result.movie?.id
        }
      })
      return result
    } catch (e) {
      toast.error(_.get(e.response, 'data.message', e.message));
      isSuccess.value = false

      setTimeout(() => {
        uploadProgress.value = 0
      }, 180000)
      throw e
    } finally {
        isUploading.value = false
    }
  }

  async function handleDelete () {
    try {
      const isConfirmed = await showModal({
        title: "Are you sure you want to delete this movie?",
        body: "This action cannot be undone.",
        primaryText: "Delete",
        primaryClass: "btn-danger",
      });

      if (!isConfirmed) {
        return false;
      }

      const result = await movieStore.softDelete(route.params?.id)
      router.replace({
        name: route.name,
        params:{}
      });

      removeFile()

      toast.success(result.message);
    } catch (e) {
      toast.error(_.get(e.response, 'data.message', e.message));
    }
  }

  function removeFile () {
    if (file.value && file.value.preview) {
      URL.revokeObjectURL(file.value.preview);
    }
    file.value = null;
    uploadProgress.value = 0;
    isUploading.value = false;
  }

   async function notifyUploadFirst () {
     const isConfirmed = await showModal({
      title: "No movies found",
      body: "You haven't uploaded any movies yet. Please upload one to continue.",
      primaryText: "Upload Now",
      primaryClass: "btn-danger",
    });

    if (isConfirmed) {
      router.push({
        name: 'action'
      })
    }
  }


  return {
    handleUpload,
    uploadProgress,
    isUploading,
    isSuccess,
    file,
    handleDelete,
    removeFile,
    notifyUploadFirst
  }
}