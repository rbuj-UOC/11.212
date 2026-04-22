<script setup lang="ts">
import { ref } from 'vue'

const isClosed = ref(false)

const toggleBlinds = () => {
  isClosed.value = !isClosed.value
}
</script>

<template>
  <article class="card">
    <span class="icon">🪟</span>
    <h3>Persianas</h3>
    <p>
      Estado: <strong>{{ isClosed ? 'Cerradas' : 'Abiertas' }}</strong>
    </p>
    <button type="button" @click="toggleBlinds">
      {{ isClosed ? 'Abrir' : 'Cerrar' }}
    </button>
  </article>
</template>

<style scoped>
.card {
  background: #f7f9fc;
  border: 1px solid #dfe4ec;
  border-radius: 12px;
  padding: 0.85rem;
}

h3 {
  margin: 0;
  font-size: 1rem;
}

p {
  margin: 0.65rem 0;
}

span.icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

button {
  border: 1px solid #bdd0e8;
  border-radius: 8px;
  background: #e8f2ff;
  color: #1f4772;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
}
</style>
