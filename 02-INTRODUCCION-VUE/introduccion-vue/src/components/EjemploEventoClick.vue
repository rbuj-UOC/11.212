<template>
  <section class="card">
    <h2>Eventos (@click)</h2>
    <p>{{ name }}</p>
    <button @click="updateName">Update name</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref<string>('John');
function updateName() {
  name.value = 'Sarah';
}
</script>

<style scoped>
.card {
  padding: 2rem;
  border: 2px solid #7fe1d6d5;
  border-radius: 1rem;
}
button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #000000;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
