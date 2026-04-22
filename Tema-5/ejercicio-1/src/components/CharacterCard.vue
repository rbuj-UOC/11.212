<script setup lang="ts">
import type { Character } from "../models/Character";

const props = defineProps<{
  character: Character;
}>();
</script>

<template>
  <article class="col-12 col-md-6 col-xl-4">
    <div class="card h-100 border-0 shadow-sm character-card">
      <img
        :src="props.character.image"
        :alt="props.character.fullName"
        class="card-img-top character-image"
      />

      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
          <div>
            <h3 class="h5 fw-bold mb-1">{{ props.character.fullName }}</h3>
            <p class="text-secondary mb-0">{{ props.character.nickname }}</p>
          </div>

          <span class="badge text-bg-success">{{ props.character.hogwartsHouse }}</span>
        </div>

        <ul class="list-unstyled small text-body-secondary mb-3">
          <li class="mb-1">
            <strong class="text-dark">Interpretado por:</strong> {{ props.character.interpretedBy }}
          </li>
          <li class="mb-1">
            <strong class="text-dark">Nacimiento:</strong> {{ props.character.birthdate }}
          </li>
          <li>
            <strong class="text-dark">Hijos:</strong>
            <span v-if="props.character.children.length">{{
              props.character.children.join(", ")
            }}</span>
            <span v-else>Sin datos</span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.character-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16) !important;
}

.character-image {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
</style>
