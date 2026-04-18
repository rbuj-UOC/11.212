<template>
  <section class="container py-4">
    <h1 class="mb-4">Listado de alumnos</h1>

    <div class="list-group shadow-sm">
      <RouterLink
        v-for="student in students"
        :key="student.id"
        :to="{ name: 'student-detail', params: { id: student.id } }"
        class="list-group-item list-group-item-action"
      >
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h5 class="mb-1">{{ student.name }}</h5>
          <span class="badge text-bg-primary rounded-pill">ID {{ student.id }}</span>
        </div>
        <p class="mb-1 text-secondary">{{ student.email }}</p>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { students } from "@/modules/students/data/students.data";
import { RouterLink } from "vue-router";
</script>
