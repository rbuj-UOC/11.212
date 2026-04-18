<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import logoUrl from "@/assets/logo.svg";
import { getCurrentUser } from "@/modules/models/user-service";

const currentUser = getCurrentUser();

const navigationLinks = computed(() => {
  if (!currentUser.isAuthenticated || currentUser.role === "Guest") {
    return [{ label: "Invitado", to: "/" }];
  }

  if (currentUser.role === "Editor") {
    return [
      { label: "Invitado", to: "/" },
      { label: "Editor", to: "/admin/editor" },
    ];
  }

  return [
    { label: "Invitado", to: "/" },
    { label: "Editor", to: "/admin/editor" },
    { label: "Admin", to: "/admin/config" },
  ];
});

const userBadgeClass = computed(() => {
  if (!currentUser.isAuthenticated) {
    return "bg-secondary";
  }

  if (currentUser.role === "Admin") {
    return "bg-danger";
  }

  if (currentUser.role === "Editor") {
    return "bg-primary";
  }

  return "bg-dark";
});
</script>

<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-dark-subtle">
    <div class="container">
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2">
        <img :src="logoUrl" alt="Vue logo" height="32" />
        <span class="fw-semibold">Control de acceso por roles</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse justify-content-end">
        <div class="navbar-nav align-items-lg-center gap-lg-2 mt-3 mt-lg-0">
          <RouterLink v-for="link in navigationLinks" :key="link.to" :to="link.to" class="nav-link">
            {{ link.label }}
          </RouterLink>
          <span class="badge rounded-pill ms-lg-3" :class="userBadgeClass">
            {{ currentUser.isAuthenticated ? currentUser.role : "No autenticado" }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link.active {
  font-weight: 600;
}
</style>
