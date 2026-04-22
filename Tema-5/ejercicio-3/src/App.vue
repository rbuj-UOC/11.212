<script setup lang="ts">
import { computed, ref } from "vue";
import StationCard from "./components/StationCard.vue";
import type { MeteoStation } from "./types/meteo";

const METEO_ESTACIONS_URL = "https://api.meteo.cat/xema/v1/estacions/metadades";
const METEO_API_KEY = "u3DfW3MfBN6ozAAesvqIN6VF7caKzlqL4XaTemwr";

const estaciones = ref<MeteoStation[]>([]);
const loading = ref(false);
const errorMessage = ref("");

const totalEstaciones = computed(() => estaciones.value.length);

const cargarEstaciones = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(METEO_ESTACIONS_URL, {
      headers: {
        "X-Api-Key": METEO_API_KEY,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as MeteoStation[];
    estaciones.value = data;
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "No se pudieron recuperar las estaciones.";
  } finally {
    loading.value = false;
  }
};

const limpiarPantalla = () => {
  estaciones.value = [];
  errorMessage.value = "";
};
</script>

<template>
  <main class="bg-light min-vh-100 py-4 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card shadow border-0 overflow-hidden">
            <div class="card-body p-4">
              <p class="text-secondary mb-4">
                Pulsa cargar para recuperar el listado de estaciones.
              </p>

              <div class="d-flex flex-wrap gap-2 mb-3">
                <button
                  type="button"
                  class="btn btn-primary px-4"
                  :disabled="loading"
                  @click="cargarEstaciones"
                >
                  {{ loading ? "Cargando..." : "Cargar" }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary px-4"
                  @click="limpiarPantalla"
                >
                  Limpiar
                </button>
              </div>

              <div class="alert alert-info mb-0 py-2 d-inline-flex align-items-center gap-2">
                <span class="fw-semibold">Total recuperado:</span>
                <span class="badge text-bg-primary">{{ totalEstaciones }}</span>
              </div>

              <div v-if="errorMessage" class="alert alert-danger mt-3 mb-0" role="alert">
                {{ errorMessage }}
              </div>
            </div>
          </div>

          <div v-if="estaciones.length" class="row g-3 mt-1">
            <div
              v-for="(estacion, index) in estaciones"
              :key="`${estacion.codi ?? 'est'}-${index}`"
              class="col-12 col-md-6"
            >
              <StationCard :estacion="estacion" :index="index" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
