<script setup lang="ts">
import type { MeteoStation } from "../types/meteo";

const props = defineProps<{
  estacion: MeteoStation;
  index: number;
}>();

const getTipoTexto = (tipo?: string) => {
  if (!tipo) {
    return "No disponible";
  }

  const tipos: Record<string, string> = {
    A: "Automática",
    S: "Semiautomática",
  };

  return tipos[tipo] ? `${tipo} (${tipos[tipo]})` : tipo;
};

const formatFecha = (fecha?: string | null) => {
  if (!fecha) {
    return "Actualidad";
  }

  const parsed = new Date(fecha);
  if (Number.isNaN(parsed.getTime())) {
    return fecha;
  }

  return parsed.toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatCoordenadas = (estacion: MeteoStation) => {
  const lat = estacion.coordenades?.latitud;
  const lng = estacion.coordenades?.longitud;

  if (lat == null || lng == null) {
    return "No disponible";
  }

  return `${lat}, ${lng}`;
};
</script>

<template>
  <article class="card border-0 shadow-sm">
    <div class="card-header bg-white d-flex flex-wrap justify-content-between gap-2 py-3">
      <div>
        <h2 class="h5 mb-1 text-primary">{{ props.estacion.nom ?? "Estación sin nombre" }}</h2>
        <p class="mb-0 text-secondary small">
          {{ props.estacion.emplacament ?? "Sin emplazamiento" }}
        </p>
      </div>
      <div class="text-end">
        <span class="badge text-bg-dark">Código: {{ props.estacion.codi ?? "-" }}</span>
        <p class="mb-0 mt-2 small text-secondary">Tipo: {{ getTipoTexto(props.estacion.tipus) }}</p>
      </div>
    </div>

    <div class="card-body p-0">
      <div class="list-group list-group-flush small">
        <div class="list-group-item d-flex justify-content-between gap-3">
          <span class="fw-semibold text-secondary">Municipio</span>
          <span class="text-end">{{ props.estacion.municipi?.nom ?? "-" }}</span>
        </div>
        <div class="list-group-item d-flex justify-content-between gap-3">
          <span class="fw-semibold text-secondary">Comarca</span>
          <span class="text-end">{{ props.estacion.comarca?.nom ?? "-" }}</span>
        </div>
        <div class="list-group-item d-flex justify-content-between gap-3">
          <span class="fw-semibold text-secondary">Provincia</span>
          <span class="text-end">{{ props.estacion.provincia?.nom ?? "-" }}</span>
        </div>
        <div class="list-group-item d-flex justify-content-between gap-3">
          <span class="fw-semibold text-secondary">Coordenadas</span>
          <span class="text-end">{{ formatCoordenadas(props.estacion) }}</span>
        </div>
        <div class="list-group-item d-flex justify-content-between gap-3">
          <span class="fw-semibold text-secondary">Altitud</span>
          <span class="text-end">{{ props.estacion.altitud ?? "-" }} m</span>
        </div>
        <div class="list-group-item d-flex justify-content-between gap-3">
          <span class="fw-semibold text-secondary">Red</span>
          <span class="text-end">
            {{ props.estacion.xarxa?.nom ?? "-" }} ({{ props.estacion.xarxa?.codi ?? "-" }})
          </span>
        </div>
        <div class="list-group-item">
          <p class="fw-semibold text-secondary mb-2">Estados</p>
          <div v-if="props.estacion.estats?.length" class="d-flex flex-wrap gap-2">
            <span
              v-for="(estado, estadoIndex) in props.estacion.estats"
              :key="`${props.estacion.codi ?? props.index}-estado-${estadoIndex}`"
              class="badge rounded-pill text-bg-light border"
            >
              {{ estado.codi ?? "-" }} | {{ formatFecha(estado.dataInici) }} -
              {{ formatFecha(estado.dataFi) }}
            </span>
          </div>
          <p v-else class="mb-0 text-secondary">Sin estados disponibles.</p>
        </div>
      </div>
    </div>
  </article>
</template>
