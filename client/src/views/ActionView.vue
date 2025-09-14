<script setup>
import { ref, onUnmounted } from "vue";
import useMovie from "@/composables/useMovie";

const file = ref(null);
const isDragging = ref(false);
const fileInput = ref(null);

const { handleUpload } = useMovie();

function openFileDialog() {
  if (!file.value) {
    fileInput.value.click();
  }
}

function handleFile(event) {
  let selectedFile;
  if (event.dataTransfer) {
    selectedFile = event.dataTransfer.files[0];
  } else if (event.target) {
    selectedFile = event.target.files[0];
  }

  if (selectedFile) {
    const parts = selectedFile.name.split(".");
    const ext = parts.pop();
    const title = parts.join(".");

    file.value = {
      preview: URL.createObjectURL(selectedFile),
      description: "",
      size: selectedFile.size,
      title,
      ext,
      video_file: selectedFile,
    };

    event.target.value = null;
  }

  isDragging.value = false;
}

function removeFile() {
  if (file.value && file.value.preview) {
    URL.revokeObjectURL(file.value.preview);
  }
  file.value = null;
}

onUnmounted(() => {
  removeFile();
});
</script>

<template>
  <section class="container mt-5">
    <div
      class="dropzone"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleFile"
      :class="isDragging ? 'border-danger' : ''"
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
          <video
            v-if="file.preview"
            :src="file.preview"
            class="file-thumb"
            controls
          ></video>
          <div class="file-info">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control bg-transparent text-white"
                id="fileName"
                placeholder="File Name"
                v-model="file.title"
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
              ></textarea>
              <label for="fileDesc" class="bg-transparent">Description</label>
            </div>
            <p class="file-size">Size: {{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
          </div>

          <section class="d-flex flex-column gap-3">
            <button class="btn btn-secondary" @click.stop="removeFile">Remove</button>
            <button class="btn btn-danger" @click="handleUpload(file)">Download</button>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.dropzone {
  border: 2px dashed #888;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;

  .dropzone-content p {
    margin: 0 0 0.5rem 0;
    color: #fff;
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

  .file-name {
    font-weight: 600;
    margin: 0;
  }

  .file-size {
    font-size: 0.85rem;
    margin: 0;
  }
}
</style>
