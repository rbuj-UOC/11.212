<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <HeaderComponent />
    <main class="flex-grow-1 d-flex flex-column">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped></style>
