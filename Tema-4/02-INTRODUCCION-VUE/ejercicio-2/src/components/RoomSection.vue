<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()
</script>

<template>
  <section class="room-section">
    <h2>{{ icon }} {{ title }}</h2>
    <div class="room-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.room-section {
  background: white;
  border: 1px solid #d8dee8;
  border-radius: 14px;
  padding: 1rem;
}

h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  color: #213547;
}

.room-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}
</style>
