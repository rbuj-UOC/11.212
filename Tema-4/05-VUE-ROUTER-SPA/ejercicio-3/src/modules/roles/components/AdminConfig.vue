<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getCurrentUser } from "@/modules/models/user-service";

const currentUser = getCurrentUser();
</script>

<template>
  <section class="py-5 bg-danger-subtle flex-grow-1 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card border-danger shadow-sm">
            <div class="card-body p-4 p-md-5">
              <span class="badge text-bg-danger mb-3">Ruta /admin/config</span>
              <h1 class="h2 fw-bold mb-3">Configuración de administrador</h1>
              <p class="text-secondary mb-4">
                Bienvenido, administrador. Este panel solo debe mostrarse si el usuario tiene rol
                Admin.
              </p>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <div class="p-3 rounded-3 bg-light border">
                    <p class="mb-1 text-uppercase small text-secondary">Autenticado</p>
                    <p class="mb-0 fw-semibold">{{ currentUser.isAuthenticated ? "Sí" : "No" }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="p-3 rounded-3 bg-light border">
                    <p class="mb-1 text-uppercase small text-secondary">Rol actual</p>
                    <p class="mb-0 fw-semibold">{{ currentUser.role }}</p>
                  </div>
                </div>
              </div>

              <RouterLink to="/" class="btn btn-outline-danger">Volver al inicio</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
