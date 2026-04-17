<script setup lang="ts">
import CurrentTimeCard from './components/CurrentTimeCard.vue'
import WeatherSummaryCard from './components/WeatherSummaryCard.vue'
import NotesCard from './components/NotesCard.vue'
</script>

<template>
  <main class="dashboard">
    <h1 class="title">Panel de control</h1>
    <section class="cards">
      <CurrentTimeCard />
      <WeatherSummaryCard />
      <NotesCard />
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  margin: 0 auto;
  max-width: 960px;
  padding: 2rem 1rem;
}

.title {
  color: #1f2937;
  font-size: 2rem;
  margin: 0 0 1.5rem;
}

.cards {
  display: grid;
  gap: 1rem;
  /* utilizar solo una columna */
  grid-template-columns: 1fr;
}
</style>
