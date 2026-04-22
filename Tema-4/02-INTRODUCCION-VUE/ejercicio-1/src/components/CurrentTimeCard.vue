<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const now = ref(new Date())

const timer = window.setInterval(() => {
  now.value = new Date()
}, 1000)

onBeforeUnmount(() => {
  window.clearInterval(timer)
})

const currentTime = computed(() => {
  return now.value.toLocaleTimeString('es-ES')
})
</script>

<template>
  <article class="card">
    <h2>Hora actual</h2>
    <p class="time">{{ currentTime }}</p>
  </article>
</template>

<style scoped>
.card {
  background-color: #fff5e6;
  border-left: 4px solid #f97316;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  padding: 1rem;
}

h2 {
  color: #334155;
  margin-top: 0;
}

.time {
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}
</style>
