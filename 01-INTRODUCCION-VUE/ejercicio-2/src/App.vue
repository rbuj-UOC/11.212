<script setup lang="ts">
import BlindsControl from './components/BlindsControl.vue'
import ElectricVehicleControl from './components/ElectricVehicleControl.vue'
import LastChargeInfo from './components/LastChargeInfo.vue'
import LampsControl from './components/LampsControl.vue'
import MusicControl from './components/MusicControl.vue'
import RoomSection from './components/RoomSection.vue'
</script>

<template>
  <main class="dashboard">
    <h1>Panel principal</h1>

    <div class="sections-grid">
      <RoomSection title="Habitación" icon="🏠">
        <LampsControl />
        <BlindsControl />
        <MusicControl />
      </RoomSection>

      <RoomSection title="Coche eléctrico" icon="🚗">
        <ElectricVehicleControl />
        <LastChargeInfo />
      </RoomSection>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  font-family: 'Avenir Next', Avenir, 'Segoe UI', sans-serif;
}

h1 {
  margin: 0 0 1.5rem;
  color: #1d2f40;
}

.sections-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
</style>
