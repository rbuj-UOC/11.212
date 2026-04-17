<script setup lang="ts">
defineOptions({ name: 'PageFooter' })
</script>

<template>
  <footer class="container text-center py-4">
    <ul class="footer-list mb-0">
      <li class="footer-text small">© 2026 Robert Buj</li>
      <li class="footer-text small">Mis listas de cine</li>
    </ul>
  </footer>
</template>

<style scoped>
.footer-list {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.footer-text {
  color: #94a3b8;
}
</style>
