<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>Primer formulario</h2>
    <label for="email">Email: </label>
    <input type="text" v-model="email" v-bind="emailAttrs" placeholder="tu@email.com" />
    <button class="btn" type="submit">Enviar</button>
    <pre>{{ values }}</pre>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const { values, defineField } = useForm()
const [email, emailAttrs] = defineField('email')

function onSubmit() {
  console.log('Submit:', JSON.stringify(values))
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem;
}
</style>
