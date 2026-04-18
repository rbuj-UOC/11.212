<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const searchText = ref("");

const getQueryValue = () => {
  const queryValue = route.query.term;
  return typeof queryValue === "string" ? queryValue : "";
};

onMounted(() => {
  searchText.value = getQueryValue();
});

watch(
  () => route.query.term,
  () => {
    searchText.value = getQueryValue();
  },
);

const submitSearch = () => {
  const term = searchText.value.trim();

  router.push({
    name: "products-results",
    query: term ? { term } : {},
  });
};
</script>

<template>
  <section class="container py-4 py-md-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4 p-md-5">
            <h1 class="h3 mb-3">Búsqueda</h1>

            <form @submit.prevent="submitSearch" class="vstack gap-3">
              <label for="search-text" class="form-label mb-0">Producto</label>
              <div class="row g-2 align-items-stretch">
                <div class="col-12 col-md">
                  <input
                    id="search-text"
                    v-model="searchText"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Ejemplo: producto"
                  />
                </div>
                <div class="col-12 col-md-auto d-grid">
                  <button type="submit" class="btn btn-primary btn-lg">Buscar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
