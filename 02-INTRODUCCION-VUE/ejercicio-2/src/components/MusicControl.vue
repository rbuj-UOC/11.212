<script setup lang="ts">
import { ref } from 'vue'

const status = ref<'Reproduciendo' | 'Pausado'>('Reproduciendo')

const pauseMusic = () => {
  status.value = 'Pausado'
}

const playMusic = () => {
  status.value = 'Reproduciendo'
}
</script>

<template>
  <article class="card">
    <!-- icono de un altavoz con un tamaño de 1.5rem -->
    <span class="icon">🔊</span>
    <h3>Música</h3>
    <p>
      Estado: <strong>{{ status }}</strong>
    </p>

    <div class="actions">
      <button type="button" @click="pauseMusic">Pausa</button>
      <button type="button" @click="playMusic">Reproducir</button>
      <button type="button" @click="playMusic">Siguiente</button>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #e8f2ff;
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

.actions {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

button {
  border: 1px solid #c8d7cc;
  border-radius: 8px;
  background: #edf8ef;
  color: #234f2f;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
}
</style>
