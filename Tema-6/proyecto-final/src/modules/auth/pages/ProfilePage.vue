<script setup lang="ts">
import { useToast } from "@/common/composables/useToast";
import { clearAuth, getUser } from "@/modules/auth/utils/token";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const user = computed(() => getUser());

function onLogout() {
  clearAuth();
  toast.info("Sesión cerrada");
  router.push("/login");
}
</script>

<template>
  <section class="container py-4">
    <header class="mb-4">
      <h1 class="h4 mb-1">Perfil de usuario</h1>
      <p class="text-muted mb-0">Información guardada de la sesión actual.</p>
    </header>

    <div class="card shadow-sm border-0">
      <div class="card-body">
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-6">
            <div class="small text-muted">Email</div>
            <div class="fw-semibold">{{ user?.email || "-" }}</div>
          </div>
          <div class="col-12 col-md-6">
            <div class="small text-muted">Nombre completo</div>
            <div class="fw-semibold">{{ user?.fullName || "No especificado" }}</div>
          </div>
          <div class="col-12 col-md-6">
            <div class="small text-muted">ID de usuario</div>
            <div class="fw-semibold">{{ user?.id || "-" }}</div>
          </div>
          <div class="col-12 col-md-6">
            <div class="small text-muted">Estado</div>
            <span class="badge" :class="user?.isActive ? 'bg-success' : 'bg-secondary'">
              {{ user?.isActive ? "Activo" : "Inactivo" }}
            </span>
          </div>
        </div>

        <button type="button" class="btn btn-outline-danger" @click="onLogout">
          Cerrar sesión
        </button>
      </div>
    </div>
  </section>
</template>
