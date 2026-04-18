<template>
  <main class="container">
    <section class="card">
      <h2>Contador</h2>
      <p :class="{ big: count >= 10 }">Valor: {{ count }}</p>
      <div class="row">
        <button class="btn" @click="decrement">-{{ props.step }}</button>
        <button class="btn" @click="increment">+{{ props.step }}</button>
      </div>
      <hr />
      <h3>Operaciones</h3>
      <p>Cuadrado: {{ square }}</p>
      <p>Factorial: {{ factorial }}</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCounterMath } from "@/composables/useCounterMath";
import type { CounterProps } from "@/models/counter-props.interface";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<CounterProps>(), { initial: 0, step: 1 });

const emit = defineEmits<{ (e: "update", value: number): void }>();

const count = ref<number>(props.initial);

function increment() {
  count.value += props.step;
}

function decrement() {
  count.value -= props.step;
}

watch(count, (v) => emit("update", v));

const { square, factorial } = useCounterMath(count);
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
}

.big {
  font-weight: 700;
  font-size: 1.25rem;
  color: red;
}
</style>
