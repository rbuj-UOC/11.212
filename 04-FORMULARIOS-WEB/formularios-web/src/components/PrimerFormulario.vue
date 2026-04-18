<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>Primer formulario</h2>
    <label for="email">Email: </label>
    <input
      id="email"
      type="text"
      v-model="email"
      v-bind="emailAttrs"
      placeholder="tu@email.com"
      :class="{ invalid: !!errors.email }"
      :aria-invalid="!!errors.email"
      aria-describedby="email-error"
    />
    <p v-if="errors.email" id="email-error" class="error">{{ errors.email }}</p>

    <button class="btn" type="submit" :disabled="!meta.valid">Enviar</button>
    <pre>{{ values }}</pre>
    <pre>{{ errors }}</pre>
    <pre>{{ meta }}</pre>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required().email(),
});

const { values, errors, meta, defineField } = useForm({
  validationSchema: schema,
});

const [email, emailAttrs] = defineField("email");

function onSubmit() {
  console.log("Submit:", JSON.stringify(values));
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem;
}

pre {
  background: #f7f7f7;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.error {
  color: #c00;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.invalid {
  outline: 2px solid #e33;
  border-radius: 6px;
}
</style>
