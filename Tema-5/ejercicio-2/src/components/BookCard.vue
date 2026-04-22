<script setup lang="ts">
import { computed } from "vue";
import type { OpenLibraryBook } from "../models/OpenLibraryBook";

const props = defineProps<{
  book: OpenLibraryBook;
}>();

const openLibraryLink = computed(() => `https://openlibrary.org${props.book.key}`);
</script>

<template>
  <div class="card h-100 border-0 shadow-sm book-card">
    <div class="card-body d-flex flex-column">
      <span class="badge text-bg-secondary align-self-start mb-3">Libro</span>
      <h2 class="h5 card-title fw-bold">{{ book.title }}</h2>
      <p class="card-text text-body-secondary mb-2">
        <strong>Autor:</strong>
        {{ book.author_name?.length ? book.author_name.join(", ") : "Desconocido" }}
      </p>
      <p class="card-text text-body-secondary mb-4">
        <strong>Año:</strong>
        {{ book.first_publish_year ?? "No disponible" }}
      </p>
      <a
        class="btn btn-outline-primary mt-auto"
        :href="openLibraryLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir ficha
      </a>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 1rem 2rem rgba(33, 37, 41, 0.12) !important;
}
</style>
