<script setup lang="ts">
defineOptions({ name: "PageHeader" });
</script>

<template>
  <header class="container text-center pt-3 pt-md-4 pb-0">
    <h1 class="display-4 fw-bold mb-3">Listado de películas</h1>
    <p class="lead subtitle mb-0">Consulta de los datos de tus películas favoritas</p>
  </header>
</template>

<style scoped>
.lead {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

.subtitle {
  color: #b8c2d6;
}
</style>
