<script setup lang="ts">
import { computed, ref } from "vue";
import songsData from "../data/songs.json";
import type { Songs } from "../models/song.interface";
import SongItem from "./SongItem.vue";

const songs = songsData as Songs[];
const showOnlyTopHits = ref(false);

const visibleSongs = computed(() => {
  if (!showOnlyTopHits.value) {
    return songs;
  }

  return songs.filter((song) => song.isTopHit);
});

const buttonLabel = computed(() => (showOnlyTopHits.value ? "Mostrar todo" : "Éxitos"));

const toggleTopHits = () => {
  showOnlyTopHits.value = !showOnlyTopHits.value;
};
</script>

<template>
  <section class="border-0 overflow-hidden">
    <div class="p-4">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <button class="btn btn-outline-primary" type="button" @click="toggleTopHits">
          {{ buttonLabel }}
        </button>

        <div
          class="song-stats d-flex align-items-center justify-content-end gap-3 ms-md-auto flex-nowrap"
        >
          <div class="song-counter d-flex flex-column align-items-center text-center">
            <div class="song-counter-number">{{ visibleSongs.length }}</div>
            <div class="song-counter-label">mostrando</div>
          </div>
          <span class="badge text-bg-secondary fs-6">Total: {{ songs.length }}</span>
        </div>
      </div>

      <div class="row g-3">
        <div v-for="song in visibleSongs" :key="song.id" class="col-12 col-md-6 col-lg-4">
          <SongItem :song="song" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  background-color: #ffffff;
}

.song-counter-number {
  color: #0d6efd;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.song-counter-label {
  color: #6c757d;
  font-size: 1rem;
  line-height: 1.2;
}
</style>
