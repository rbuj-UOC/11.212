<script setup lang="ts">
import { computed, ref } from 'vue';

const contador = ref(0);

const incrementar = () => {
  contador.value++;
};

const factorial = computed(() => {
  const n = contador.value;
  let resultado = 1;

  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
});
</script>

<template>
  <div>
    <h2 data-test="contador">Contador: {{ contador }}</h2>
    <h3 data-test="factorial">Factorial: {{ factorial }}</h3>

    <button data-test="btn-incrementar" @click="incrementar">Incrementar</button>
  </div>
</template>
