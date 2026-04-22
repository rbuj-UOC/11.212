<script setup lang="ts">
import { ref } from "vue";
import SignUpForm from "@/components/SignUpForm.vue";
import type { UserRegistration } from "@/models/user.interface";

const registeredUser = ref<UserRegistration | null>(null);
const resetKey = ref(0);

function handleRegister(payload: UserRegistration) {
  registeredUser.value = payload;
}

function handleNewRegistration() {
  registeredUser.value = null;
  resetKey.value += 1;
}
</script>

<template>
  <main class="app-shell py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7">
          <div
            v-if="!registeredUser"
            class="alert alert-warning d-flex align-items-center gap-2 py-2 px-3"
            role="status"
          >
            <span class="badge text-bg-warning">Estado</span>
            <span class="fw-semibold">Pendiente de registro</span>
          </div>
          <div v-else class="alert alert-success py-2 px-3" role="status">
            <div class="d-flex flex-column align-items-start gap-2">
              <strong>Registro correcto.</strong>
              <p class="mb-0">Bienvenido, {{ registeredUser.name }}.</p>
              <button
                class="btn btn-outline-secondary btn-sm new-registration-btn"
                @click="handleNewRegistration"
              >
                Nuevo registro
              </button>
            </div>
          </div>

          <SignUpForm
            :disabled="Boolean(registeredUser)"
            :reset-key="resetKey"
            @submit="handleRegister"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9ff 0%, #eef2f7 100%);
}

.new-registration-btn:hover {
  background-color: #198754;
  border-color: #198754;
  color: #ffffff;
}
</style>
