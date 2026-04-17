<template>
  <main class="container">
    <section class="card">
      <h2>Contador</h2>
      <p :class="{ big: count >= 10 }">Valor: {{ count }}</p>
      <div class="row">
        <button class="btn" @click="decrement">-1</button>
        <button class="btn" @click="increment">+1</button>
      </div>
      <hr />
      <h3>Operaciones</h3>
      <p>Cuadrado: {{ square }}</p>
      <p>Factorial: {{ factorial }}</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { CounterProps } from '@/models/counter-props.interface'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<CounterProps>(), { initial: 0 })

const count = ref<number>(props.initial)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

const square = computed(() => count.value * count.value)

function factorialOf(n: number): number {
  if (n < 0) return NaN
  let res = 1
  for (let i = 2; i <= n; i++) res *= i
  return res
}

const factorial = computed(() => factorialOf(count.value))
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
