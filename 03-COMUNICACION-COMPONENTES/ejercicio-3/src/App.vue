<script setup lang="ts">
import AppHeader from './components/Header.vue'
import SongListContainer from './components/SongListContainer.vue'
import AppFooter from './components/Footer.vue'
</script>

<template>
  <div class="app-shell min-vh-100 d-flex flex-column">
    <AppHeader />

    <main class="container py-4 flex-grow-1">
      <SongListContainer />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-shell {
  background:
    radial-gradient(circle at top right, rgba(13, 110, 253, 0.08), transparent 35%),
    radial-gradient(circle at bottom left, rgba(25, 135, 84, 0.08), transparent 35%), #f8f9fa;
}
</style>
