<script setup lang="ts">
import { computed, ref } from "vue";
import BookCard from "./components/BookCard.vue";
import type { OpenLibraryBook } from "./models/OpenLibraryBook";

interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
  numFound: number;
}

const query = ref("");
const books = ref<OpenLibraryBook[]>([]);
const totalResults = ref(0);
const searchedQuery = ref("");
const loading = ref(false);
const errorMessage = ref("");

const trimmedQuery = computed(() => query.value.trim());
const canSearch = computed(() => trimmedQuery.value.length > 0 && !loading.value);

const searchBooks = async () => {
  const searchTerm = trimmedQuery.value;

  if (!searchTerm) {
    errorMessage.value = "Introduce un título o autor para buscar.";
    books.value = [];
    totalResults.value = 0;
    searchedQuery.value = "";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    const apiUrl = new URL("https://openlibrary.org/search.json");
    apiUrl.searchParams.set("q", searchTerm);
    apiUrl.searchParams.set("limit", "12");

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      throw new Error("No se ha podido recuperar la información de libros.");
    }

    const data = (await response.json()) as OpenLibraryResponse;
    books.value = data.docs;
    totalResults.value = data.numFound;
    searchedQuery.value = searchTerm;
  } catch (error) {
    books.value = [];
    totalResults.value = 0;
    searchedQuery.value = searchTerm;
    errorMessage.value =
      error instanceof Error ? error.message : "Ha ocurrido un error inesperado.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="min-vh-100 bg-light py-5 app-shell">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <section class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4 p-lg-5">
              <form class="row g-3 align-items-end" @submit.prevent="searchBooks">
                <div class="col-12 col-lg-9">
                  <label for="search-query" class="form-label fw-semibold">Título o autor</label>
                  <input
                    id="search-query"
                    v-model="query"
                    type="search"
                    class="form-control form-control-lg"
                    placeholder="Por ejemplo: Harry Potter, Tolkien, Dune..."
                  />
                </div>
                <div class="col-12 col-lg-3 d-grid">
                  <button type="submit" class="btn btn-primary btn-lg" :disabled="!canSearch">
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                    {{ loading ? "Buscando..." : "Buscar" }}
                  </button>
                </div>
              </form>

              <p class="text-body-secondary mt-3 mb-0">
                Se muestran hasta 12 resultados por búsqueda con título, autor, año y enlace directo
                a la ficha.
              </p>
            </div>
          </section>

          <div v-if="errorMessage" class="alert alert-danger shadow-sm" role="alert">
            {{ errorMessage }}
          </div>

          <section
            v-if="searchedQuery && !errorMessage"
            class="mb-3 d-flex flex-wrap gap-2 align-items-center"
          >
            <span class="badge text-bg-dark">Búsqueda: {{ searchedQuery }}</span>
            <span class="text-body-secondary">{{ totalResults }} resultados encontrados</span>
          </section>

          <section v-if="loading" class="card border-0 shadow-sm">
            <div class="card-body p-5 text-center">
              <div class="spinner-border text-primary mb-3" role="status" aria-hidden="true"></div>
              <p class="mb-0 fw-semibold">Cargando libros...</p>
            </div>
          </section>

          <section v-else-if="books.length" class="row g-4">
            <article v-for="book in books" :key="book.key" class="col-12 col-md-6 col-xl-4">
              <BookCard :book="book" />
            </article>
          </section>

          <section v-else class="card border-0 shadow-sm">
            <div class="card-body p-5 text-center text-body-secondary">
              <h2 class="h4 text-body mb-3">Sin resultados todavía</h2>
              <p class="mb-0">
                Escribe un término de búsqueda y pulsa el botón para mostrar libros de Open Library.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.app-shell {
  background: #f8f9fa;
}

.hero-wrap {
  display: flex;
  justify-content: center;
}

.hero-card {
  background: #0d6efd;
  width: min(100%, 44rem);
  border-radius: 1.5rem;
  overflow: hidden;
}

.hero-text {
  max-width: 42rem;
}
</style>
