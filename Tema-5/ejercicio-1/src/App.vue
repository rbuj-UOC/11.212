<script setup lang="ts"></script>

<template>
  <div class="app-shell">
    <header class="hero border-bottom border-warning border-4">
      <div class="container py-4 py-lg-5">
        <div
          class="d-flex flex-column flex-lg-row gap-3 align-items-lg-end justify-content-between"
        >
          <div>
            <h1 class="display-5 fw-bold mb-2 text-white">Harry Potter App</h1>
            <p class="lead text-white-50 mb-0">
              Consulta los libros y personajes desde la API pública.
            </p>
          </div>

          <nav class="nav nav-pills gap-2">
            <RouterLink class="nav-link" active-class="active" to="/books">Libros</RouterLink>
            <RouterLink class="nav-link" active-class="active" to="/characters"
              >Personajes</RouterLink
            >
          </nav>
        </div>
      </div>
    </header>

    <main class="main-surface py-4 py-lg-5">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background: #1f2937;
  min-height: 100vh;
}

:global(#app) {
  min-height: 100vh;
}

:global(a) {
  text-decoration: none;
}

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero {
  background: #111827;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
}

.main-surface {
  flex: 1;
  background: #1f2937;
}

.nav-pills .nav-link {
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.05);
}

.nav-pills .nav-link.active {
  color: #111827;
  background: #fcd34d;
  border-color: #fcd34d;
}
</style>
