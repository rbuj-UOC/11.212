<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CHARACTERS_API } from "../api/potter";
import CharacterCard from "../components/CharacterCard.vue";
import type { Character } from "../models/Character";

const characters = ref<Character[]>([]);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  try {
    const response = await fetch(CHARACTERS_API);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    characters.value = (await response.json()) as Character[];
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "No se pudieron cargar los personajes.";
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
        <p class="text-uppercase text-secondary fw-semibold mb-1">Personajes</p>
        <h2 class="display-6 fw-bold mb-2 plain-title">Listado de personajes</h2>
        <p class="text-secondary mb-0">Datos recuperados directamente del endpoint /characters.</p>
      </div>

      <div class="badge rounded-pill text-bg-dark px-3 py-2 align-self-start align-self-md-auto">
        {{ characters.length }} personajes
      </div>
    </div>

    <div v-if="isLoading" class="alert alert-info border-0 shadow-sm">Cargando personajes...</div>

    <div v-else-if="errorMessage" class="alert alert-danger border-0 shadow-sm">
      {{ errorMessage }}
    </div>

    <div v-else class="row g-4">
      <CharacterCard
        v-for="character in characters"
        :key="character.fullName"
        :character="character"
      />
    </div>
  </section>
</template>

<style scoped>
.plain-title {
  color: white;
}
</style>
