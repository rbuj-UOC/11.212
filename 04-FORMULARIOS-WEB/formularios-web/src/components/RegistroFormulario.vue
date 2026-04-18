<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>Registro</h2>

    <!-- Nombre -->
    <label for="name">Nombre</label>
    <input
      id="name"
      type="text"
      v-model="name"
      v-bind="nameAttrs"
      :class="{ invalid: !!errors.name }"
      :aria-invalid="!!errors.name"
      aria-describedby="name-error"
      placeholder="Tu nombre"
    />
    <p v-if="errors.name" id="name-error" class="error">{{ errors.name }}</p>

    <!-- Email -->
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      v-model="email"
      v-bind="emailAttrs"
      :class="{ invalid: !!errors.email }"
      :aria-invalid="!!errors.email"
      aria-describedby="email-error"
      placeholder="tu@email.com"
    />
    <p v-if="errors.email" id="email-error" class="error">{{ errors.email }}</p>

    <!-- Contraseña -->
    <label for="password">Contraseña</label>
    <input
      id="password"
      type="password"
      v-model="password"
      v-bind="passwordAttrs"
      :class="{ invalid: !!errors.password }"
      :aria-invalid="!!errors.password"
      aria-describedby="password-error"
      placeholder="Mín. 8 caracteres"
    />
    <p v-if="errors.password" id="password-error" class="error">{{ errors.password }}</p>

    <!-- Confirmación Contraseña -->
    <label for="confirm">Repite la contraseña</label>
    <input
      id="confirm"
      type="password"
      v-model="confirm"
      v-bind="confirmAttrs"
      :class="{ invalid: !!errors.confirm }"
      :aria-invalid="!!errors.confirm"
      aria-describedby="confirm-error"
    />
    <p v-if="errors.confirm" id="confirm-error" class="error">{{ errors.confirm }}</p>

    <!-- País -->
    <label for="country">País</label>
    <select
      id="country"
      v-model="country"
      v-bind="countryAttrs"
      :class="{ invalid: !!errors.country }"
      :aria-invalid="!!errors.country"
      aria-describedby="country-error"
    >
      <option value="">Selecciona…</option>
      <option value="es">España</option>
      <option value="ar">Argentina</option>
      <option value="mx">México</option>
    </select>
    <p v-if="errors.country" id="country-error" class="error">{{ errors.country }}</p>

    <!-- Fecha de nacimiento -->
    <label for="birthdate">Fecha de nacimiento</label>
    <input
      id="birthdate"
      type="date"
      v-model="birthdate"
      v-bind="birthdateAttrs"
      :class="{ invalid: !!errors.birthdate }"
      :aria-invalid="!!errors.birthdate"
      aria-describedby="birthdate-error"
    />
    <p v-if="errors.birthdate" id="birthdate-error" class="error">{{ errors.birthdate }}</p>

    <!-- Edad -->
    <label for="age">Edad</label>
    <input
      id="age"
      type="number"
      v-model="age"
      v-bind="ageAttrs"
      :class="{ invalid: !!errors.age }"
      :aria-invalid="!!errors.age"
      aria-describedby="age-error"
      placeholder="Ej. 21"
    />
    <p v-if="errors.age" id="age-error" class="error">{{ errors.age }}</p>

    <button class="btn" type="submit" :disabled="!meta.valid">Crear cuenta</button>

    <!-- Debug -->
    <details class="debug">
      <summary>Debug</summary>
      <pre>values: {{ values }}</pre>
      <pre>errors: {{ errors }}</pre>
      <pre>meta:   {{ meta }}</pre>
    </details>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

// Esquema de validación
const schema = yup.object({
  name: yup.string().required().min(2).max(50),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required(),
  country: yup.string().required("Selecciona un país"),
  birthdate: yup
    .date()
    .typeError("Introduce una fecha válida")
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha no puede ser futura"),
  age: yup
    .number()
    .typeError("Introduce un número válido")
    .required("La edad es obligatoria")
    .min(0, "La edad no puede ser negativa")
    .max(120, "Introduce una edad realista"),
});

// Valores iniciales
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  country: "es",
  birthdate: "",
  age: "",
};

const { values, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues,
});

// Campos
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirm, confirmAttrs] = defineField("confirm");
const [country, countryAttrs] = defineField("country");
const [birthdate, birthdateAttrs] = defineField("birthdate");
const [age, ageAttrs] = defineField("age");

// Submit simulado
function onSubmit() {
  console.log("REGISTER payload: ", JSON.stringify(values));
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
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
.btn {
  margin-top: 0.5rem;
}
.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.debug {
  margin-top: 0.75rem;
}
</style>
