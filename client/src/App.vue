<script setup>
import { provide } from 'vue'
import useModal from '@/composables/useModal'

const { modalRef, modalConfig, showModal, handleConfirm, handleCancel } = useModal()
provide('showModal', showModal)
</script>

<template>
  <router-view />

  <div class="modal fade" tabindex="-1" ref="modalRef" aria-hidden="true">
    <div :class="['modal-dialog', modalConfig.size]">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalConfig.title }}</h5>
          <button type="button" class="btn-close" @click="handleCancel" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-html="modalConfig.body"></p>
        </div>
        <div class="modal-footer">
          <button
            v-if="modalConfig.secondaryBtn"
            type="button"
            :class="['btn', modalConfig.secondaryClass]"
            @click="handleCancel"
          >
            {{ modalConfig.secondaryText }}
          </button>
          <button type="button" :class="['btn', modalConfig.primaryClass]" @click="handleConfirm">
            {{ modalConfig.primaryText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
