<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Container from "./components/Container.vue";
import movies from "./data/movies.json";
</script>

<template>
  <div class="app d-flex flex-column min-vh-100">
    <Header />
    <main class="app__main flex-grow-1">
      <Container :movies="movies" />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
:global(body) {
  min-width: 320px;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #0a0f1d;
  color: #f8fafc;
}

.app__main {
  padding-bottom: 2rem;
}
</style>
