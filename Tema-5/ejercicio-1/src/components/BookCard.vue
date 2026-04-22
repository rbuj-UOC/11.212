<script setup lang="ts">
import type { Book } from "../models/Book";

const props = defineProps<{
  book: Book;
}>();
</script>

<template>
  <article class="col-12 col-lg-6">
    <div class="card h-100 border-0 shadow-sm book-card overflow-hidden">
      <div class="row g-0 h-100">
        <div class="col-md-4 cover-column">
          <img
            :src="props.book.cover"
            :alt="props.book.title"
            class="img-fluid h-100 w-100 object-fit-cover"
          />
        </div>

        <div class="col-md-8">
          <div class="card-body d-flex flex-column h-100">
            <div class="d-flex justify-content-between gap-3 mb-2">
              <span class="badge text-bg-warning text-dark">Libro {{ props.book.number }}</span>
              <small class="text-secondary">{{ props.book.releaseDate }}</small>
            </div>

            <h3 class="h5 fw-bold">{{ props.book.title }}</h3>
            <p class="text-secondary small mb-2">Título original: {{ props.book.originalTitle }}</p>
            <p class="card-text text-body-secondary flex-grow-1">{{ props.book.description }}</p>

            <div
              class="mt-auto pt-2 border-top d-flex justify-content-between text-secondary small"
            >
              <span>Páginas</span>
              <strong class="text-dark">{{ props.book.pages }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.book-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16) !important;
}

.cover-column {
  min-height: 100%;
  background: linear-gradient(180deg, #111827, #374151);
}

@media (max-width: 767.98px) {
  .cover-column {
    min-height: 260px;
  }
}
</style>
