<script setup lang="ts">
import { reactive, watch } from "vue";
import { useSignUpValidation } from "@/composables/useSignUpValidation";
import type { UserRegistration } from "@/models/user.interface";

const props = defineProps<{
  disabled?: boolean;
  resetKey: number;
}>();

const emit = defineEmits<{
  submit: [payload: UserRegistration];
}>();

const form = reactive<UserRegistration>({
  name: "",
  email: "",
  password: "",
});

const {
  errors,
  isFormValid,
  nameError,
  emailError,
  passwordError,
  touchField,
  touchAll,
  resetValidation,
} = useSignUpValidation(form);

function clearForm() {
  form.name = "";
  form.email = "";
  form.password = "";
}

function handleSubmit() {
  touchAll();

  if (!isFormValid.value || props.disabled) {
    return;
  }

  emit("submit", {
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password,
  });
}

watch(
  () => props.resetKey,
  () => {
    clearForm();
    resetValidation();
  },
);
</script>

<template>
  <form class="signup-card border rounded-4 p-3 p-md-4" @submit.prevent="handleSubmit">
    <div class="mb-4 text-center">
      <h2 class="h3 mb-0">Formulario de registro</h2>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label fw-semibold required-field">Nombre</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-control form-control-lg"
        placeholder="Introduce tu nombre"
        :disabled="disabled"
        @input="touchField('name')"
      />
      <div v-if="nameError" class="form-text text-danger">{{ nameError }}</div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label fw-semibold required-field">Correo electrónico</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-control form-control-lg"
        placeholder="usuario@correo.com"
        :disabled="disabled"
        @input="touchField('email')"
      />
      <div v-if="emailError" class="form-text text-danger">{{ emailError }}</div>
    </div>

    <div class="mb-4">
      <label for="password" class="form-label fw-semibold required-field">Contraseña</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        class="form-control form-control-lg"
        placeholder="Mínimo 8 caracteres"
        :disabled="disabled"
        @input="touchField('password')"
      />
      <div v-if="passwordError" class="form-text text-danger">{{ passwordError }}</div>
    </div>

    <button
      type="submit"
      class="btn btn-lg w-100 fw-semibold text-white"
      :class="disabled ? 'btn-secondary' : 'btn-primary'"
      :disabled="disabled || !isFormValid"
    >
      {{ disabled ? "Ya registrado" : "Regístrate" }}
    </button>

    <div v-if="errors.length" class="alert alert-danger mt-3 mb-0" role="alert">
      <p class="mb-2 fw-semibold">Revisa los siguientes errores:</p>
      <ul class="mb-0 ps-3">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </form>
</template>

<style scoped>
.signup-card {
  background: #ffffff;
  border-color: #e4e7ec !important;
}

.required-field::after {
  content: " *";
  color: #dc3545;
}
</style>
