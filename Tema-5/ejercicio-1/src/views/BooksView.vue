<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BOOKS_API } from "../api/potter";
import BookCard from "../components/BookCard.vue";
import type { Book } from "../models/Book";

const books = ref<Book[]>([]);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  try {
    const response = await fetch(BOOKS_API);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    books.value = (await response.json()) as Book[];
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "No se pudieron cargar los libros.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section>
    <div
      class="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-end mb-4"
    >
      <div>
        <p class="text-uppercase text-secondary fw-semibold mb-1">Libros</p>
        <h2 class="display-6 fw-bold mb-2 plain-title">Listado de libros de Harry Potter</h2>
        <p class="text-secondary mb-0">Datos recuperados directamente del endpoint /books.</p>
      </div>

      <div class="badge rounded-pill text-bg-dark px-3 py-2 align-self-start align-self-md-auto">
        {{ books.length }} libros
      </div>
    </div>

    <div v-if="isLoading" class="alert alert-info border-0 shadow-sm">Cargando libros...</div>

    <div v-else-if="errorMessage" class="alert alert-danger border-0 shadow-sm">
      {{ errorMessage }}
    </div>

    <div v-else class="row g-4">
      <BookCard v-for="book in books" :key="book.number" :book="book" />
    </div>
  </section>
</template>

<style scoped>
.plain-title {
  color: white;
}
</style>
