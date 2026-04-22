<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("El nombre completo es obligatorio.")
    .min(3, "El nombre completo debe tener al menos 3 caracteres.")
    .max(100, "El nombre completo no puede superar los 100 caracteres."),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio.")
    .email("Introduce un correo electrónico válido."),
  subject: yup.string().required("El asunto es obligatorio."),
  message: yup
    .string()
    .required("El mensaje es obligatorio.")
    .min(20, "El mensaje debe tener al menos 20 caracteres."),
});

const { handleSubmit, defineField, errors, meta } = useForm({
  validationSchema,
  initialValues: {
    fullName: "",
    email: "",
    subject: "",
    message: "",
  },
  validateOnMount: true,
});

const [fullName, fullNameAttrs] = defineField("fullName");
const [email, emailAttrs] = defineField("email");
const [subject, subjectAttrs] = defineField("subject");
const [message, messageAttrs] = defineField("message");

const onSubmit = handleSubmit((values) => {
  console.log("Formulario de contacto enviado:", values);
});
</script>

<template>
  <section class="card shadow-lg border-0 overflow-hidden">
    <div class="card-body p-4 p-md-5 bg-white">
      <form class="row g-4" @submit.prevent="onSubmit">
        <div class="col-12">
          <label for="fullName" class="form-label fw-semibold">Nombre completo</label>
          <input
            id="fullName"
            v-model="fullName"
            v-bind="fullNameAttrs"
            type="text"
            class="form-control form-control-lg"
            :class="{ 'is-invalid': errors.fullName }"
            placeholder="Ej. Laura García"
            autocomplete="name"
          />
          <div v-if="errors.fullName" class="invalid-feedback d-block">
            {{ errors.fullName }}
          </div>
        </div>

        <div class="col-12">
          <label for="email" class="form-label fw-semibold">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            class="form-control form-control-lg"
            :class="{ 'is-invalid': errors.email }"
            placeholder="nombre@ejemplo.com"
            autocomplete="email"
          />
          <div v-if="errors.email" class="invalid-feedback d-block">
            {{ errors.email }}
          </div>
        </div>

        <div class="col-12">
          <label for="subject" class="form-label fw-semibold">Asunto</label>
          <input
            id="subject"
            v-model="subject"
            v-bind="subjectAttrs"
            type="text"
            class="form-control form-control-lg"
            :class="{ 'is-invalid': errors.subject }"
            placeholder="Motivo de tu consulta"
            autocomplete="off"
          />
          <div v-if="errors.subject" class="invalid-feedback d-block">
            {{ errors.subject }}
          </div>
        </div>

        <div class="col-12">
          <label for="message" class="form-label fw-semibold">Mensaje</label>
          <textarea
            id="message"
            v-model="message"
            v-bind="messageAttrs"
            class="form-control"
            :class="{ 'is-invalid': errors.message }"
            rows="6"
            placeholder="Escribe aquí tu mensaje con detalle..."
          />
          <div v-if="errors.message" class="invalid-feedback d-block">
            {{ errors.message }}
          </div>
        </div>

        <div class="col-12 d-flex align-items-center">
          <button type="submit" class="btn btn-primary btn-lg px-4" :disabled="!meta.valid">
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: 1.5rem;
}
</style>
