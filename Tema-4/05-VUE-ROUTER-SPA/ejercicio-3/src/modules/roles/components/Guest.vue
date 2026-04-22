<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser, setCurrentUser } from "@/modules/models/user-service";
import type { UserRole } from "@/modules/models/user-state";

const router = useRouter();
const currentUser = getCurrentUser();

const formState = reactive({
  isAuthenticated: currentUser.isAuthenticated,
  role: currentUser.role,
});

const canAccessAdmin = computed(() => formState.role === "Admin");
const canAccessEditor = computed(() => formState.role === "Editor" || formState.role === "Admin");

function applyChanges(): void {
  setCurrentUser({
    isAuthenticated: formState.isAuthenticated,
    role: formState.role,
  });
}

function syncAndNavigate(path: string): void {
  applyChanges();
  router.push(path);
}

function setGuestState(): void {
  formState.isAuthenticated = false;
  formState.role = "Guest";
  applyChanges();
}

function setRole(role: UserRole): void {
  formState.role = role;
  if (role === "Guest") {
    formState.isAuthenticated = false;
  }
  applyChanges();
}

function setAuthState(isAuthenticated: boolean): void {
  formState.isAuthenticated = isAuthenticated;
  if (!isAuthenticated) {
    formState.role = "Guest";
  }
  applyChanges();
}
</script>

<template>
  <section class="py-5 bg-body-tertiary flex-grow-1 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-9">
          <div class="row g-4 align-items-stretch">
            <div class="col-12 col-lg-7">
              <div class="card shadow-sm h-100 border-0">
                <div class="card-body p-4 p-md-5">
                  <span class="badge text-bg-warning mb-3">Ruta /</span>
                  <h1 class="display-6 fw-semibold mb-3">Zona de invitado</h1>
                  <p class="lead text-secondary mb-4">
                    Esta pantalla permite simular distintos estados de usuario para probar el guard
                    de roles y las redirecciones.
                  </p>

                  <div class="d-flex flex-wrap gap-2 mb-4">
                    <button class="btn btn-outline-secondary" type="button" @click="setGuestState">
                      Reset guest
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="syncAndNavigate('/admin/editor')"
                    >
                      Probar editor
                    </button>
                    <button
                      class="btn btn-danger"
                      type="button"
                      @click="syncAndNavigate('/admin/config')"
                    >
                      Probar admin
                    </button>
                  </div>

                  <div class="alert alert-info mb-0" role="alert">
                    Si el rol no es suficiente, la app volverá a la portada y mostrará el motivo en
                    la consola.
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-5">
              <div class="card shadow-sm h-100 border-0 bg-dark text-white">
                <div class="card-body p-4 p-md-5">
                  <h2 class="h4 mb-4">Estado actual</h2>

                  <div class="mb-3">
                    <label class="form-label">Autenticado</label>
                    <div class="btn-group w-100" role="group">
                      <input
                        id="auth-off"
                        v-model="formState.isAuthenticated"
                        class="btn-check"
                        type="radio"
                        :value="false"
                        name="auth-state"
                        @change="setAuthState(false)"
                      />
                      <label class="btn btn-outline-light" for="auth-off">No</label>

                      <input
                        id="auth-on"
                        v-model="formState.isAuthenticated"
                        class="btn-check"
                        type="radio"
                        :value="true"
                        name="auth-state"
                        @change="setAuthState(true)"
                      />
                      <label class="btn btn-outline-light" for="auth-on">Sí</label>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="role-select" class="form-label">Rol</label>
                    <select
                      id="role-select"
                      v-model="formState.role"
                      class="form-select"
                      @change="setRole(formState.role)"
                    >
                      <option value="Guest">Guest</option>
                      <option value="Editor">Editor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div class="border rounded-3 p-3 bg-black bg-opacity-25">
                    <p class="mb-1 text-uppercase small text-white-50">Resumen</p>
                    <p class="mb-0">
                      <strong>Autenticado:</strong>
                      {{ currentUser.isAuthenticated ? "Sí" : "No" }}
                    </p>
                    <p class="mb-0"><strong>Rol:</strong> {{ currentUser.role }}</p>
                    <p class="mb-0">
                      <strong>Puede entrar a editor:</strong>
                      {{ canAccessEditor ? "Sí" : "No" }}
                    </p>
                    <p class="mb-0">
                      <strong>Puede entrar a admin:</strong>
                      {{ canAccessAdmin ? "Sí" : "No" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
