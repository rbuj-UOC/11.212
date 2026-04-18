<template>
  <section class="container py-5 student-detail-page">
    <div class="detail-wrapper">
      <div v-if="student" class="card detail-card border-0 shadow">
        <div class="card-header bg-primary text-white border-0">
          <h1 class="h5 mb-0">Detalle del alumno: {{ student.name }}</h1>
        </div>

        <div class="card-body p-0">
          <ul class="list-group list-group-flush detail-list">
            <li class="list-group-item d-flex">
              <span class="detail-label">ID</span>
              <span class="detail-value">{{ student.id }}</span>
            </li>
            <li class="list-group-item d-flex">
              <span class="detail-label">Email</span>
              <span class="detail-value">{{ student.email }}</span>
            </li>
            <li class="list-group-item d-flex">
              <span class="detail-label">Curso</span>
              <span class="detail-value">{{ student.course }}</span>
            </li>
          </ul>
        </div>

        <div class="card-footer bg-white border-0 pt-3 pb-4 px-4">
          <RouterLink to="/" class="btn btn-primary">Volver al listado</RouterLink>
        </div>
      </div>

      <div v-else class="alert alert-warning" role="alert">
        No se encontró el alumno seleccionado.
        <div class="mt-3">
          <RouterLink to="/" class="btn btn-outline-primary">Volver al listado</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { students } from "@/modules/students/data/students.data";
import { RouterLink } from "vue-router";

const props = defineProps<{
  id: string;
}>();

const student = computed(() =>
  students.find((currentStudent) => currentStudent.id === Number(props.id)),
);
</script>

<style scoped>
.student-detail-page {
  min-height: 70vh;
}

.detail-wrapper {
  max-width: 460px;
  margin: 0 auto;
}

.detail-card {
  border-radius: 0.75rem;
  overflow: hidden;
}

.detail-list .list-group-item {
  padding: 0.95rem 1.25rem;
  align-items: center;
  justify-content: space-between;
}

.detail-label {
  color: #6c757d;
  font-weight: 600;
  min-width: 110px;
}

.detail-value {
  color: #212529;
  text-align: right;
  word-break: break-word;
}

@media (max-width: 576px) {
  .detail-list .list-group-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .detail-value {
    text-align: left;
  }
}
</style>
