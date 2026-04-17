<script setup lang="ts">
import CounterComponent from './components/CounterComponent.vue'
</script>

<template>
  <main class="container">
    <h1 v-once>Comunicación entre componentes</h1>
    <CounterComponent />
    <CounterComponent :initial="5" :step="2" />
    <CounterComponent :initial="14" />
  </main>
</template>

<style scoped></style>
