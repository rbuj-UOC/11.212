<script setup lang="ts">
import { ref } from 'vue'
import AlertComponent from '@/components/AlertComponent.vue'
import type { AlertProps } from '@/models/alert-props.interface'

const alertVisible = ref(false)
const alertKey = ref(0)
const currentAlert = ref<AlertProps>({
  message: '',
  type: 'success',
  duration: 4000,
})

const showAlert = (type: NonNullable<AlertProps['type']>, message: string) => {
  alertVisible.value = false
  currentAlert.value = { message, type, duration: 4000 }
  alertKey.value += 1
  alertVisible.value = true
}
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="mb-2 text-center">Componente reutilizable</h1>

        <div class="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <button
            type="button"
            class="btn btn-success"
            @click="showAlert('success', 'Operación realizada correctamente')"
          >
            Correcto
          </button>
          <button
            type="button"
            class="btn btn-warning"
            @click="showAlert('warning', 'Mensaje de advertencia')"
          >
            Aviso
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="showAlert('error', 'Se ha producido un error')"
          >
            Error
          </button>
        </div>

        <AlertComponent
          v-if="alertVisible"
          :key="alertKey"
          :message="currentAlert.message"
          :type="currentAlert.type"
          :duration="currentAlert.duration"
          @close="alertVisible = false"
        />
      </div>
    </div>
  </main>
</template>
