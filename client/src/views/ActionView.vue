<script setup>
import { ref, onUnmounted, watch } from 'vue'
import useMovie from '@/composables/useMovie'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movie'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import _ from 'lodash'

const route = useRoute()
const isDragging = ref(false)
const fileInput = ref(null)

const movieStore = useMovieStore()

const { handleUpload, isUploading, uploadProgress, isSuccess, file, handleDelete, removeFile } =
  useMovie()

function openFileDialog(isOpen = false) {
  if (!file.value || isOpen) {
    fileInput.value.click()
  }
}

function handleFile(event) {
  let selectedFile
  if (event.dataTransfer) {
    selectedFile = event.dataTransfer.files[0]
  } else if (event.target) {
    selectedFile = event.target.files[0]
  }

  if (selectedFile) {
    const parts = selectedFile.name.split('.')
    const ext = parts.pop()
    const title = parts.join('.')

    file.value = {
      ...file.value,
      preview: URL.createObjectURL(selectedFile),
      ext,
      size: selectedFile.size,
      title: _get(movieStore.movie, 'title', title),
      description: _.get(movieStore.movie, 'description', ''),
      video_file: selectedFile,
    }

    event.target.value = null
  }

  isDragging.value = false
}

onUnmounted(() => {
  removeFile()
})

watch(
  () => route.params?.id,
  async (val) => {
    if (!val) {
      movieStore.movie = {}
      file.value = null
      return false
    }

    const data = await movieStore.get(val)
    file.value = {
      preview: import.meta.env.VITE_STATIC_ASSET_PATH + data.video_file,
      ...data,
    }

    file.value.video_file = null
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <section class="container mt-5">
    <form
      class="dropzone needs-validations"
      novalidate
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleFile"
      :class="isDragging ? 'border-danger' : ''"
      @submit.prevent="handleUpload"
    >
      <input
        type="file"
        accept="video/*"
        class="dropzone-input"
        @change="handleFile"
        ref="fileInput"
        hidden
      />
      <div
        class="dropzone-content"
        :class="{ 'dropzone-content--disabled': file }"
        @click="!file ? openFileDialog() : null"
      >
        <p v-if="!file">Drag or drop a movie here</p>

        <div v-else class="file-item">
          <video v-if="file.preview" :src="file.preview" class="file-thumb" controls></video>

          <div class="file-info">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control bg-transparent text-white"
                id="fileName"
                placeholder="File Name"
                name="title"
                v-model="file.title"
                required
              />
              <label for="fileName">Title</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control bg-transparent text-white"
                id="fileDesc"
                placeholder="Description"
                style="height: 100px"
                v-model="file.description"
                name="description"
                required
              ></textarea>
              <label for="fileDesc" class="bg-transparent">Description</label>
            </div>
            <p class="file-size" v-if="file.size">
              Size: {{ (file.size / 1024 / 1024).toFixed(2) }} MB
            </p>

            <div v-if="uploadProgress" class="progress mt-2">
              <div
                class="progress-bar"
                :class="isSuccess ? 'bg-success' : 'bg-warning'"
                role="progressbar"
                :style="{ width: uploadProgress + '%' }"
              >
                {{ uploadProgress }}%
              </div>
            </div>
          </div>

          <section class="d-flex flex-column gap-3 mt-3">
            <button
              v-if="!route.params.id"
              type="button"
              class="btn btn-secondary"
              @click.stop="removeFile"
            >
              Remove
            </button>

            <button v-else type="button" class="btn btn-secondary" @click.stop="handleDelete">
              Delete
            </button>

            <button
              v-if="route.params.id && !_isEmpty(movieStore.movie)"
              type="button"
              class="btn btn-primary"
              :disabled="isUploading"
              @click="openFileDialog(true)"
            >
              Upload
            </button>

            <button type="submit" class="btn btn-danger" :disabled="isUploading">Save</button>
          </section>
        </div>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.dropzone {
  border: 2px dashed #888;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition:
    border-color 0.3s,
    background-color 0.3s;

  .dropzone-content p {
    margin: 0 0 0.5rem 0;
    color: #fff;
  }

  .file-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 5px;
  }

  .file-thumb {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
    border-radius: 5px;
  }

  .file-info {
    flex: 1;
    text-align: left;
  }

  .progress {
    height: 20px;
    background-color: #444;
    border-radius: 5px;

    .progress-bar {
      height: 100%;
      text-align: center;
      color: #fff;
      line-height: 20px;
      transition: width 0.3s;
    }
  }
}
</style>
