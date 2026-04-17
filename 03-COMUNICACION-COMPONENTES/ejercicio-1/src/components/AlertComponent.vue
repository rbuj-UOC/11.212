<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { AlertProps } from '@/models/alert-props.interface'

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'success',
  duration: 3000,
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const closeAlert = () => {
  if (!visible.value) {
    return
  }

  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }

  visible.value = false
  setTimeout(() => emit('close'), 150)
}

onMounted(() => {
  closeTimer = setTimeout(() => {
    closeAlert()
  }, props.duration)
})

onUnmounted(() => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
})
</script>

<template>
  <transition name="alert-fade">
    <div
      v-if="visible"
      class="alert alert-with-accent d-flex align-items-center justify-content-between mb-0"
      :class="{
        'alert-type-success alert-success': props.type === 'success',
        'alert-type-warning alert-warning': props.type === 'warning',
        'alert-type-error alert-danger': props.type === 'error',
      }"
      role="alert"
    >
      <span class="alert-content">
        <span class="alert-icon" aria-hidden="true"></span>
        <span>{{ message }}</span>
      </span>
      <button type="button" class="btn-close" aria-label="Cerrar" @click="closeAlert"></button>
    </div>
  </transition>
</template>

<style scoped>
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: opacity 0.15s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
}

.alert-with-accent {
  position: relative;
  overflow: hidden;
}

.alert-with-accent::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.35rem;
}

.alert-type-success::before {
  background-color: #198754;
}

.alert-type-warning::before {
  background-color: #d39e00;
}

.alert-type-error::before {
  background-color: #b02a37;
}

.alert-content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-type-success .alert-content {
  color: #0f5132;
}

.alert-type-warning .alert-content {
  color: #664d03;
}

.alert-type-error .alert-content {
  color: #842029;
}

.alert-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
}

.alert-type-success .alert-icon::before {
  content: '✔';
}

.alert-type-warning .alert-icon::before {
  content: '⚠';
}

.alert-type-error .alert-icon::before {
  content: '✖';
}
</style>
