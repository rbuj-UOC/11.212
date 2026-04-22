const { createApp, ref, computed } = Vue;

const app = createApp({
  template: `
    <main class="min-vh-100 bg-light py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-7 col-xl-6">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-4 p-md-5">
                <div class="mb-4">
                  <span class="badge text-bg-primary mb-3">Vue 3 + Bootstrap</span>
                  <h1 class="h3 mb-2">Calculadora de áreas</h1>
                  <p class="text-muted mb-0">
                    Selecciona una figura y completa solo los campos necesarios para ver el cálculo automáticamente.
                  </p>
                </div>

                <div class="mb-4">
                  <label class="form-label fw-semibold" for="shape-select">Figura geométrica</label>
                  <select id="shape-select" v-model="selectedShape" class="form-select">
                    <option value="square">Cuadrado</option>
                    <option value="rectangle">Rectángulo</option>
                    <option value="circle">Círculo</option>
                    <option value="triangle">Triángulo</option>
                  </select>
                </div>

                <div v-if="selectedShape === 'square'" class="mb-4">
                  <label class="form-label fw-semibold" for="side">Lado</label>
                  <input id="side" v-model.number="side" type="number" class="form-control" min="0" step="any" placeholder="Introduce el lado" />
                </div>

                <div v-if="selectedShape === 'rectangle'" class="row g-3 mb-4">
                  <div class="col-12 col-sm-6">
                    <label class="form-label fw-semibold" for="rectangle-base">Base</label>
                    <input id="rectangle-base" v-model.number="base" type="number" class="form-control" min="0" step="any" placeholder="Introduce la base" />
                  </div>
                  <div class="col-12 col-sm-6">
                    <label class="form-label fw-semibold" for="rectangle-height">Altura</label>
                    <input id="rectangle-height" v-model.number="height" type="number" class="form-control" min="0" step="any" placeholder="Introduce la altura" />
                  </div>
                </div>

                <div v-if="selectedShape === 'circle'" class="mb-4">
                  <label class="form-label fw-semibold" for="circle-radius">Radio</label>
                  <input id="circle-radius" v-model.number="radius" type="number" class="form-control" min="0" step="any" placeholder="Introduce el radio" />
                </div>

                <div v-if="selectedShape === 'triangle'" class="row g-3 mb-4">
                  <div class="col-12 col-sm-6">
                    <label class="form-label fw-semibold" for="triangle-base">Base</label>
                    <input id="triangle-base" v-model.number="base" type="number" class="form-control" min="0" step="any" placeholder="Introduce la base" />
                  </div>
                  <div class="col-12 col-sm-6">
                    <label class="form-label fw-semibold" for="triangle-height">Altura</label>
                    <input id="triangle-height" v-model.number="height" type="number" class="form-control" min="0" step="any" placeholder="Introduce la altura" />
                  </div>
                </div>

                <div class="alert alert-primary mb-3" role="status">
                  <div class="fw-semibold mb-1">Fórmula</div>
                  <div data-test="formula">{{ formula }}</div>
                </div>

                <div class="p-3 bg-body-tertiary rounded-3 border">
                  <div class="text-muted small mb-1">Resultado</div>
                  <div class="fs-5 fw-bold" data-test="area">Área calculada: {{ areaDisplay }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,

  setup() {
    const selectedShape = ref("square");
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
        default:
          return "";
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
        default:
          return 0;
      }
    });

    const areaDisplay = computed(() => {
      return Number.isInteger(area.value) ? area.value : area.value.toFixed(2);
    });

    return {
      selectedShape,
      side,
      base,
      height,
      radius,
      formula,
      areaDisplay,
    };
  },
});

app.mount("#vueApp");