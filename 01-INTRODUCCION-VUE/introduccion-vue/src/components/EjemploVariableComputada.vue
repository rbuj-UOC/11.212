<template>
  <section class="card">
    <h2>Propiedades computadas</h2>
    <p>Aprobados: {{ approvedCount }}</p>
  </section>
</template>

<script setup lang="ts">
import type { Grade } from '@/models/grade.interface';
import { computed, ref } from 'vue';

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

const approvedCount = computed(() => gradesData.value.filter((g) => g.grade >= 5).length);
</script>

<style scoped>
.card {
  padding: 2rem;
  border: 2px solid #f5b9b9d5;
  border-radius: 1rem;
}
p {
  margin: 0.25rem 0 0.75rem;
  font-weight: 600;
}
</style>
