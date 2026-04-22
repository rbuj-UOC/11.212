<script setup lang="ts">
import { ref } from 'vue'

const isOn = ref(false)
const intensity = ref(70)

const toggleLights = () => {
  isOn.value = !isOn.value
}
</script>

<template>
  <article class="card">
    <span class="icon">💡</span>
    <header>
      <h3>Luces</h3>
      <button class="icon-button" type="button" @click="toggleLights" :aria-pressed="isOn">
        {{ isOn ? '💡' : '🔅' }}
      </button>
    </header>

    <p>
      Estado: <strong>{{ isOn ? 'Encendidas' : 'Apagadas' }}</strong>
    </p>

    <label v-if="isOn" class="range-wrapper">
      Intensidad: <strong>{{ intensity }}%</strong>
      <input v-model="intensity" type="range" min="0" max="100" />
    </label>
  </article>
</template>

<style scoped>
.card {
  background: #fff4df;
  border: 1px solid #dfe4ec;
  border-radius: 12px;
  padding: 0.85rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
  font-size: 1rem;
}

p {
  margin: 0.65rem 0 0;
}

span.icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.icon-button {
  border: 1px solid #c8d1de;
  background: #f7f9fc;
  border-radius: 8px;
  font-size: 1.1rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}

.range-wrapper {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.6rem;
}

input[type='range'] {
  width: 100%;
}
</style>
