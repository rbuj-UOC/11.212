<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row g-0 min-vh-100">
      <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center brand-side">
        <div class="text-center">
          <img
            src="@/assets/logo.svg"
            alt="Logo TodoApp"
            class="img-fluid mb-3"
            style="max-width: 160px"
          />
          <h2 class="fw-semibold">TodoApp</h2>
          <p class="text-muted mb-0">Tu gestor de tareas simple y eficaz</p>
        </div>
      </div>

      <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <div class="w-100" style="max-width: 420px">
          <header class="mb-4 text-center">
            <h1 class="h3 fw-bold mb-1">Iniciar sesión</h1>
            <p class="text-secondary mb-0">Accede a tu cuenta para gestionar tus tareas</p>
          </header>

          <form class="card shadow-sm" @submit.prevent novalidate>
            <div class="card-body p-4 p-md-5">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" type="email" class="form-control" placeholder="tu@email.com" />
              </div>

              <div class="mb-2">
                <label for="password" class="form-label">Contraseña</label>
                <input id="password" type="password" class="form-control" placeholder="••••••••" />
              </div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="remember" />
                  <label class="form-check-label" for="remember">Recuérdame</label>
                </div>
                <a href="#" class="small text-decoration-none">¿Olvidaste tu contraseña?</a>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">Entrar</button>
              </div>

              <p class="text-center text-secondary mt-4 mb-0">
                ¿No tienes cuenta?
                <RouterLink to="/register" class="text-decoration-none">Crear cuenta</RouterLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brand-side {
  background: linear-gradient(135deg, #e9f3ff 0%, #f6f9ff 100%);
  padding: 2rem;
}

@media (max-width: 991.98px) {
  .brand-side img {
    max-width: 120px;
  }
}
</style>
