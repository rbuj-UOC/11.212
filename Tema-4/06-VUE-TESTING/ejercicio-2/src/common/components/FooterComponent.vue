<script setup lang="ts">
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="mt-auto border-top bg-light">
    <div class="container py-3">
      <p class="mb-0 small text-muted text-center">© {{ year }} Robert Buj</p>
    </div>
  </footer>
</template>
