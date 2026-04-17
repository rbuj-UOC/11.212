<script setup lang="ts">
import PrimerComponenteSFC from './components/PrimerComponenteSFC.vue';
import EjemploReactividad from './components/EjemploReactividad.vue';
import EjemploEventoClick from './components/EjemploEventoClick.vue';

console.log('Hello world from script (Vite + TS)');
</script>

<template>
  <main style="padding: 1rem">
    <h1>Hello world from Vue App (Vite + TS)</h1>
    <p>Hello world from template</p>

    <PrimerComponenteSFC />
    <hr />
    <EjemploReactividad />
    <hr />
    <EjemploEventoClick />
  </main>
</template>

<style scoped>
/* Estilo global aplicado a toda la app */
body {
  font-family: Arial, sans-serif;
}
</style>
