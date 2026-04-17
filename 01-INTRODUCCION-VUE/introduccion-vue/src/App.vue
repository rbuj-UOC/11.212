<script setup lang="ts">
import PrimerComponenteSFC from './components/PrimerComponenteSFC.vue';
import EjemploReactividad from './components/EjemploReactividad.vue';
import EjemploEventoClick from './components/EjemploEventoClick.vue';
import EjemploLista from './components/EjemploLista.vue';
import EjemploVisibilidad from './components/EjemploVisibilidad.vue';
import EjemploVariableComputada from './components/EjemploVariableComputada.vue';

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
    <hr />
    <EjemploLista />
    <hr />
    <EjemploVisibilidad />
    <hr />
    <EjemploVariableComputada />
  </main>
</template>

<style scoped>
/* Estilo global aplicado a toda la app */
body {
  font-family: Arial, sans-serif;
}
</style>
