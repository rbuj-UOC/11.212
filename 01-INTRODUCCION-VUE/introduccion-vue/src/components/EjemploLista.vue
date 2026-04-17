<template>
  <section class="card">
    <h2>Listado con v-for</h2>
    <ul>
      <li v-for="item in gradesData" :key="item.id">{{ item.name }}: {{ item.grade }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Grade {
  id: number;
  name: string;
  grade: number;
}

const gradesData = ref<Grade[]>([
  { id: 1, name: 'Alice Johnson', grade: 8.5 },
  { id: 2, name: 'Bob Smith', grade: 7.2 },
  { id: 3, name: 'Charlie Brown', grade: 9.0 },
  { id: 4, name: 'Diana Prince', grade: 4.8 },
  { id: 5, name: 'Ethan Hunt', grade: 5.9 },
  { id: 6, name: 'Fiona Gallagher', grade: 8.1 },
  { id: 7, name: 'George Miller', grade: 2.7 },
  { id: 8, name: 'Hannah Lee', grade: 9.3 },
  { id: 9, name: 'Ian Wright', grade: 3.4 },
  { id: 10, name: 'Julia Roberts', grade: 7.9 },
]);
</script>

<style scoped>
.card {
  padding: 2rem;
  border: 2px solid #97c3e8d5;
  border-radius: 1rem;
}
ul {
  padding-left: 2rem;
}
</style>
