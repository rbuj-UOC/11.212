<template>
  <section class="card">
    <h2>Primer formulario</h2>
    <input type="text" v-model="email" v-bind="emailAttrs" placeholder="tu@email.com" />
    <pre>{{ values }}</pre>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const { values, defineField } = useForm()
const [email, emailAttrs] = defineField('email')
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem;
}
</style>
