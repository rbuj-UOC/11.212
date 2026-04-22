<script setup lang="ts">
import { computed, ref } from "vue";

type Shape = "square" | "rectangle" | "circle" | "triangle";

const selectedShape = ref<Shape>("square");
const side = ref(0);
const base = ref(0);
const height = ref(0);
const radius = ref(0);

const formula = computed(() => {
  switch (selectedShape.value) {
    case "square":
      return "Área = lado × lado";
    case "rectangle":
      return "Área = base × altura";
    case "circle":
      return "Área = π × radio²";
    case "triangle":
      return "Área = (base × altura) / 2";
  }
});

const area = computed(() => {
  switch (selectedShape.value) {
    case "square":
      return side.value * side.value;
    case "rectangle":
      return base.value * height.value;
    case "circle":
      return Math.PI * radius.value * radius.value;
    case "triangle":
      return (base.value * height.value) / 2;
  }
});

const areaDisplay = computed(() => area.value.toFixed(2));
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <section class="card shadow-sm">
          <div class="card-body">
            <h1 class="h3 mb-4">Calculadora de áreas</h1>

            <div class="mb-3">
              <label class="form-label" for="shape-select">Figura geométrica</label>
              <select
                id="shape-select"
                v-model="selectedShape"
                class="form-select"
                data-test="shape-select"
              >
                <option value="square">Cuadrado</option>
                <option value="rectangle">Rectángulo</option>
                <option value="circle">Círculo</option>
                <option value="triangle">Triángulo</option>
              </select>
            </div>

            <div v-if="selectedShape === 'square'" class="mb-3">
              <label class="form-label" for="side">Lado</label>
              <input id="side" v-model.number="side" data-test="square-side" type="number" class="form-control" min="0" />
            </div>

            <div v-if="selectedShape === 'rectangle'" class="mb-3 row g-3">
              <div class="col-12 col-sm-6">
                <label class="form-label" for="rectangle-base">Base</label>
                <input
                  id="rectangle-base"
                  v-model.number="base"
                  data-test="rectangle-base"
                  type="number"
                  class="form-control"
                  min="0"
                />
              </div>
              <div class="col-12 col-sm-6">
                <label class="form-label" for="rectangle-height">Altura</label>
                <input
                  id="rectangle-height"
                  v-model.number="height"
                  data-test="rectangle-height"
                  type="number"
                  class="form-control"
                  min="0"
                />
              </div>
            </div>

            <div v-if="selectedShape === 'circle'" class="mb-3">
              <label class="form-label" for="circle-radius">Radio</label>
              <input
                id="circle-radius"
                v-model.number="radius"
                data-test="circle-radius"
                type="number"
                class="form-control"
                min="0"
              />
            </div>

            <div v-if="selectedShape === 'triangle'" class="mb-3 row g-3">
              <div class="col-12 col-sm-6">
                <label class="form-label" for="triangle-base">Base</label>
                <input
                  id="triangle-base"
                  v-model.number="base"
                  data-test="triangle-base"
                  type="number"
                  class="form-control"
                  min="0"
                />
              </div>
              <div class="col-12 col-sm-6">
                <label class="form-label" for="triangle-height">Altura</label>
                <input
                  id="triangle-height"
                  v-model.number="height"
                  data-test="triangle-height"
                  type="number"
                  class="form-control"
                  min="0"
                />
              </div>
            </div>

            <p class="mb-1" data-test="formula">Fórmula: {{ formula }}</p>
            <p class="mb-0 fw-semibold" data-test="area">Área calculada: {{ areaDisplay }}</p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
