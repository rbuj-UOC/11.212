<script setup lang="ts">
defineOptions({ name: 'PageHeader' })
</script>

<template>
  <header class="header">
    <h1 class="header__title">Listado de películas</h1>
    <p class="header__subtitle">Consulta de los datos de tus películas favoritas</p>
  </header>
</template>

<style scoped>
.header {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3rem 0 1.5rem;
  text-align: center;
}

.header__title {
  margin: 0;
  font-size: clamp(2.6rem, 4vw, 4.4rem);
  line-height: 0.95;
}

.header__subtitle {
  max-width: 48rem;
  margin: 1rem auto 0;
  color: rgba(246, 241, 255, 0.78);
  font-size: 1.05rem;
}
</style>
