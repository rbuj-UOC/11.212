<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const chargeLevel = ref(25)
const isConnected = ref(false)

let chargingTimer: ReturnType<typeof setInterval> | null = null

const statusText = computed(() => {
  if (!isConnected.value) {
    return 'Desconectado'
  }

  if (chargeLevel.value >= 100) {
    return 'Carga completa'
  }

  return 'Cargando'
})

const connectVehicle = () => {
  if (isConnected.value) {
    return
  }

  isConnected.value = true

  if (chargingTimer) {
    clearInterval(chargingTimer)
  }

  chargingTimer = setInterval(() => {
    if (chargeLevel.value >= 100) {
      clearInterval(chargingTimer as ReturnType<typeof setInterval>)
      chargingTimer = null
      return
    }

    chargeLevel.value += 1
  }, 400)
}

const disconnectVehicle = () => {
  isConnected.value = false

  if (chargingTimer) {
    clearInterval(chargingTimer)
    chargingTimer = null
  }
}

onBeforeUnmount(() => {
  if (chargingTimer) {
    clearInterval(chargingTimer)
  }
})
</script>

<template>
  <article class="card">
    <h3>Vehículo eléctrico</h3>
    <p>
      Estado: <strong>{{ statusText }}</strong>
    </p>
    <p>
      Carga actual: <strong>{{ chargeLevel }}%</strong>
    </p>

    <progress :value="chargeLevel" max="100" />

    <div class="actions">
      <button type="button" @click="connectVehicle" :disabled="isConnected">Conectar</button>
      <button type="button" @click="disconnectVehicle" :disabled="!isConnected">Desconectar</button>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #dfe4ec;
  border-radius: 12px;
  padding: 0.85rem;
}

h3 {
  margin: 0;
  font-size: 1rem;
}

p {
  margin: 0.65rem 0 0;
}

progress {
  width: 100%;
  height: 0.9rem;
  margin-top: 0.75rem;
}

.actions {
  display: flex;
  gap: 0.45rem;
  margin-top: 0.75rem;
}

button {
  border: 1px solid #d8c5a2;
  border-radius: 8px;
  background: #fff4df;
  color: #7a4f00;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
