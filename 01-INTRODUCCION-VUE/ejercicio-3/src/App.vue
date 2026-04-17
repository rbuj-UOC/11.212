<script setup lang="ts">
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Container from './components/Container.vue'
import movies from './data/movies.json'
</script>

<template>
  <div class="app">
    <Header />
    <main class="app__main">
      <Container :movies="movies" />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
  background:
    radial-gradient(circle at top, rgba(255, 198, 109, 0.32), transparent 28%),
    linear-gradient(180deg, #130f1f 0%, #1f1534 100%);
  color: #f6f1ff;
}

:global(a) {
  color: inherit;
}

:global(button),
:global(img) {
  font: inherit;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
}
</style>
