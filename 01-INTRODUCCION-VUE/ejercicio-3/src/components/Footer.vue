<script setup lang="ts">
defineOptions({ name: 'PageFooter' })
</script>

<template>
  <footer class="footer">
    <p class="footer__text">Mis listas de cine</p>
  </footer>
</template>

<style scoped>
.footer {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1.5rem 0 2rem;
  text-align: center;
}

.footer__text {
  margin: 0;
  color: rgba(246, 241, 255, 0.6);
  font-size: 0.92rem;
}
</style>
