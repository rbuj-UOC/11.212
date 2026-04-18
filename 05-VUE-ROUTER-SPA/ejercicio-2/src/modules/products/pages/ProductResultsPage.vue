<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { products } from "@/modules/products/data/products";

const route = useRoute();
const router = useRouter();

const term = computed(() => {
  const queryValue = route.query.term;
  return typeof queryValue === "string" ? queryValue.trim() : "";
});

const filteredProducts = computed(() => {
  const queryText = term.value.toLowerCase();

  if (!queryText) {
    return products;
  }

  return products.filter((product) => {
    return product.name.toLowerCase().includes(queryText);
  });
});

const goBackToSearch = () => {
  router.push({
    name: "products-search",
    query: term.value ? { term: term.value } : {},
  });
};
</script>

<template>
  <section class="container py-4 py-md-5">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
    >
      <div>
        <h1 class="h3 mb-1">Resultados de busqueda</h1>
        <p class="text-secondary mb-0">
          Filtro aplicado:
          <strong>{{ term || "(sin filtro)" }}</strong>
        </p>
      </div>
      <button type="button" class="btn btn-outline-primary" @click="goBackToSearch">
        Volver al formulario
      </button>
    </div>

    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <ul v-if="filteredProducts.length" class="list-group list-group-flush">
          <li
            v-for="product in filteredProducts"
            :key="product.id"
            class="list-group-item d-flex justify-content-between align-items-center py-3"
          >
            <div>
              <h2 class="h6 mb-1">{{ product.name }}</h2>
              <small class="text-secondary">Categoria: {{ product.category }}</small>
            </div>
            <span class="badge text-bg-primary">{{ product.price.toFixed(2) }} €</span>
          </li>
        </ul>

        <div v-else class="p-4 text-center text-secondary">
          No hay productos que coincidan con el filtro actual.
        </div>
      </div>
    </div>
  </section>
</template>
