<script setup lang="ts">
import type { Songs } from "../models/song.interface";

defineProps<{
  song: Songs;
}>();
</script>

<template>
  <article
    class="card h-100 shadow-sm song-item"
    :class="song.isTopHit ? 'border border-3 border-warning' : 'border-0'"
  >
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
        <h2 class="h6 mb-0 fw-bold">{{ song.title }}</h2>
        <span v-if="song.isTopHit" class="badge text-bg-warning">Top Hit</span>
      </div>

      <div class="d-flex justify-content-between align-items-center gap-2">
        <span class="text-secondary">Artista:</span>
        <span class="text-end">{{ song.artist }}</span>
      </div>

      <div class="d-flex justify-content-between align-items-center gap-2">
        <span class="text-secondary">Duración:</span>
        <span class="text-end">{{ song.duration }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.song-item {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.song-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12) !important;
}
</style>
