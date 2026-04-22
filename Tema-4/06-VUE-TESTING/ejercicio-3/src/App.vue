<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUsers, type User } from "./services/userService";

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch {
    error.value = "No se han podido cargar los usuarios.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main class="page-shell">
    <section class="card">
      <p class="eyebrow">Ejercicio 3</p>
      <h1>Listado de usuarios</h1>

      <p v-if="loading" class="state">Cargando usuarios...</p>
      <p v-else-if="error" class="state state-error">{{ error }}</p>

      <ul v-else class="user-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <span class="user-id">#{{ user.id }}</span>
          <span>{{ user.name }}</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top, rgba(52, 211, 153, 0.22), transparent 32%),
    linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}

.card {
  width: min(100%, 640px);
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  color: #0f766e;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  color: #0f172a;
}

.state {
  margin: 24px 0 0;
  font-size: 1rem;
  color: #334155;
}

.state-error {
  color: #b91c1c;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fafc;
  color: #0f172a;
}

.user-id {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: #d1fae5;
  color: #065f46;
  font-size: 0.875rem;
  font-weight: 700;
}
</style>
