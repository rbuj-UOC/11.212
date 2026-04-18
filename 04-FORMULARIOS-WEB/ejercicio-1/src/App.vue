<script setup lang="ts">
import RegisterForm from "./components/RegisterForm.vue";
</script>

<template>
  <main class="contact-page d-flex align-items-start py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9 col-xl-8">
          <h1 class="display-6 fw-bold text-center text-primary mb-4">Formulario de contacto</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: #f5f7fa;
}
</style>
