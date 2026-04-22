<template>
  <section class="card">
    <h2>Variables reactivas</h2>
    <p>{{ name }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref<string>('John');

setTimeout(() => {
  name.value = 'Alice';
}, 2000);
</script>

<style scoped>
.card {
  padding: 2rem;
  border: 2px solid #eef35fd5;
  border-radius: 1rem;
}
</style>
