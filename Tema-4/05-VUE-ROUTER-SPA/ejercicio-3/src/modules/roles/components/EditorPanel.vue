<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getCurrentUser } from "@/modules/models/user-service";

const currentUser = getCurrentUser();
</script>

<template>
  <section class="py-5 bg-primary-subtle flex-grow-1 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9">
          <div class="card border-primary shadow-sm">
            <div class="card-body p-4 p-md-5">
              <span class="badge text-bg-primary mb-3">Ruta /admin/editor</span>
              <h1 class="h2 fw-bold mb-3">Panel de edición</h1>
              <p class="text-secondary mb-4">Este contenido está disponible para Editor y Admin.</p>

              <div class="row g-3 mb-4">
                <div class="col-md-4">
                  <div class="p-3 rounded-3 bg-light border h-100">
                    <p class="mb-1 text-uppercase small text-secondary">Autenticado</p>
                    <p class="mb-0 fw-semibold">{{ currentUser.isAuthenticated ? "Sí" : "No" }}</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="p-3 rounded-3 bg-light border h-100">
                    <p class="mb-1 text-uppercase small text-secondary">Rol actual</p>
                    <p class="mb-0 fw-semibold">{{ currentUser.role }}</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="p-3 rounded-3 bg-light border h-100">
                    <p class="mb-1 text-uppercase small text-secondary">Permiso</p>
                    <p class="mb-0 fw-semibold">Editor o Admin</p>
                  </div>
                </div>
              </div>

              <RouterLink to="/" class="btn btn-outline-primary">Volver al inicio</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
