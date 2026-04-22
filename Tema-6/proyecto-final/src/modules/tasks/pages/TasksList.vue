<script setup lang="ts">
import { mapApiError } from "@/api/apiErrors";
import { useToast } from "@/common/composables/useToast";
import TaskForm from "@/modules/tasks/components/TaskForm.vue";
import type { CreateTaskDto } from "@/modules/tasks/models/create-task.dto";
import type { Task, TaskPriority } from "@/modules/tasks/models/task.model";
import {
  completeAllPendingTasks,
  completeTask,
  createTask,
  deleteAllCompletedTasks,
  getTasks,
} from "@/modules/tasks/services/tasks.service";
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const toast = useToast();

const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const filterText = ref("");
const sortField = ref<"dueDate" | "priority" | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");
const cardView = ref(false);

const priorityWeight: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

const visibleTasks = computed(() => {
  let result = [...tasks.value];
  const term = filterText.value.trim().toLowerCase();

  if (term) {
    result = result.filter((task) => {
      return (
        task.name.toLowerCase().includes(term) || task.description.toLowerCase().includes(term)
      );
    });
  }

  if (sortField.value === "dueDate") {
    result.sort((a, b) => {
      const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return sortDirection.value === "asc" ? diff : -diff;
    });
  }

  if (sortField.value === "priority") {
    result.sort((a, b) => {
      const diff = priorityWeight[a.priority] - priorityWeight[b.priority];
      return sortDirection.value === "asc" ? diff : -diff;
    });
  }

  return result;
});

const viewButtonLabel = computed(() => (cardView.value ? "Vista lista" : "Vista tarjetas"));

function toggleSort(field: "dueDate" | "priority") {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    return;
  }

  sortField.value = field;
  sortDirection.value = "asc";
}

function clearSort() {
  sortField.value = null;
  sortDirection.value = "asc";
}

function sortArrow(field: "dueDate" | "priority") {
  if (sortField.value !== field) return "";
  return sortDirection.value === "asc" ? "up" : "down";
}

async function loadTasks() {
  loading.value = true;
  error.value = null;

  try {
    tasks.value = await getTasks();
  } catch {
    error.value = "No se han podido cargar las tareas.";
  } finally {
    loading.value = false;
  }
}

async function onCreateTask(payload: CreateTaskDto) {
  try {
    await createTask(payload);
    toast.success("Tarea creada correctamente");
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, "No se ha podido crear la tarea"));
  }
}

async function onCompleteTask(taskId: string) {
  try {
    await completeTask(taskId);
    toast.success("Tarea completada");
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, "No se ha podido completar la tarea"));
  }
}

async function onCompleteAll() {
  try {
    await completeAllPendingTasks();
    toast.success("Todas las tareas pendientes se han completado");
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, "No se han podido completar las tareas"));
  }
}

async function onDeleteCompleted() {
  try {
    await deleteAllCompletedTasks();
    toast.success("Tareas completadas eliminadas");
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, "No se han podido eliminar las tareas completadas"));
  }
}

function priorityBadge(p: TaskPriority) {
  if (p === "high") return "bg-danger";
  if (p === "medium") return "bg-primary";
  return "bg-secondary";
}

onMounted(loadTasks);
</script>

<template>
  <section class="container py-4">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">Mis tareas</h1>
      <RouterLink to="/" class="btn btn-outline-secondary btn-sm">Volver a Home</RouterLink>
    </header>

    <TaskForm :disabled="loading" @submit="onCreateTask" />

    <div class="d-flex gap-2 mb-3">
      <button
        class="btn btn-sm btn-outline-success"
        :disabled="tasks.length === 0 || loading"
        @click="onCompleteAll"
      >
        Completar todas
      </button>

      <button
        class="btn btn-sm btn-outline-danger"
        :disabled="!tasks.some((t) => t.completed) || loading"
        @click="onDeleteCompleted"
      >
        Eliminar completadas
      </button>

      <button
        class="btn btn-sm btn-outline-secondary ms-auto"
        :disabled="loading"
        @click="loadTasks"
      >
        Recargar
      </button>
    </div>

    <div class="card border-0 shadow-sm mb-3">
      <div class="card-body">
        <div class="row g-2 align-items-end">
          <div class="col-12 col-md-5">
            <label for="task-filter" class="form-label small text-muted mb-1"
              >Filtrar por nombre o descripcion</label
            >
            <input
              id="task-filter"
              v-model="filterText"
              type="search"
              class="form-control"
              placeholder="Escribe para filtrar tareas..."
              :disabled="loading"
            />
          </div>

          <div class="col-12 col-md-7">
            <div class="d-flex flex-wrap gap-2 justify-content-md-end">
              <button
                class="btn btn-sm btn-outline-dark"
                :disabled="loading"
                @click="toggleSort('dueDate')"
              >
                Fecha
                <span v-if="sortArrow('dueDate') === 'up'">&uarr;</span>
                <span v-else-if="sortArrow('dueDate') === 'down'">&darr;</span>
              </button>

              <button
                class="btn btn-sm btn-outline-dark"
                :disabled="loading"
                @click="toggleSort('priority')"
              >
                Prioridad
                <span v-if="sortArrow('priority') === 'up'">&uarr;</span>
                <span v-else-if="sortArrow('priority') === 'down'">&darr;</span>
              </button>

              <button
                v-if="sortField"
                class="btn btn-sm btn-outline-warning"
                :disabled="loading"
                @click="clearSort"
              >
                Limpiar orden
              </button>

              <button
                class="btn btn-sm btn-outline-primary"
                :disabled="loading"
                @click="cardView = !cardView"
              >
                {{ viewButtonLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="!loading && visibleTasks.length && !cardView" class="list-group">
      <RouterLink
        v-for="task in visibleTasks"
        :key="task.id"
        :to="{ name: 'task-detail', params: { id: task.id } }"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <div class="me-3">
          <span class="badge me-2" :class="task.completed ? 'bg-success' : 'bg-warning text-dark'">
            {{ task.completed ? "Hecha" : "Pendiente" }}
          </span>

          <span class="fw-semibold">{{ task.name }}</span>

          <span class="badge ms-2" :class="priorityBadge(task.priority)">
            {{ task.priority }}
          </span>

          <div class="text-muted small mt-1">
            {{ task.description }}
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <small class="text-muted">{{ new Date(task.dueDate).toLocaleDateString() }}</small>

          <button
            v-if="!task.completed"
            class="btn btn-sm btn-outline-success"
            @click.prevent="onCompleteTask(task.id)"
            title="Completar"
          >
            ✓
          </button>
        </div>
      </RouterLink>
    </div>

    <div v-if="!loading && visibleTasks.length && cardView" class="row g-3">
      <div v-for="task in visibleTasks" :key="task.id" class="col-12 col-md-6 col-xl-4">
        <RouterLink
          :to="{ name: 'task-detail', params: { id: task.id } }"
          class="card h-100 shadow-sm text-decoration-none text-body"
        >
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge" :class="task.completed ? 'bg-success' : 'bg-warning text-dark'">
                {{ task.completed ? "Hecha" : "Pendiente" }}
              </span>

              <span class="badge" :class="priorityBadge(task.priority)">
                {{ task.priority }}
              </span>
            </div>

            <h2 class="h6 fw-semibold mb-2">{{ task.name }}</h2>
            <p class="text-muted small mb-3">{{ task.description }}</p>

            <div class="mt-auto d-flex justify-content-between align-items-center">
              <small class="text-muted">{{ new Date(task.dueDate).toLocaleDateString() }}</small>

              <button
                v-if="!task.completed"
                class="btn btn-sm btn-outline-success"
                @click.prevent="onCompleteTask(task.id)"
                title="Completar"
              >
                ✓
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <p v-if="!loading && tasks.length === 0" class="text-muted">No tienes tareas todavia.</p>
    <p v-if="!loading && tasks.length > 0 && visibleTasks.length === 0" class="text-muted">
      No hay tareas que coincidan con el filtro.
    </p>
  </section>
</template>
