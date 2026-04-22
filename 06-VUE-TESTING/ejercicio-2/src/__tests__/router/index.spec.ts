import { beforeEach, describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory } from "vue-router";
import App from "@/App.vue";
import { createAppRouter } from "@/router";

const mountApp = async (initialPath = "/") => {
  const router = createAppRouter(createMemoryHistory());

  await router.push(initialPath);
  await router.isReady();

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  return { router, wrapper };
};

describe("navegación de estudiantes", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it('debería mostrar la lista de estudiantes en la ruta raíz "/"', async () => {
    const { wrapper } = await mountApp("/");

    expect(wrapper.text()).toContain("Listado de alumnos");
    expect(wrapper.text()).toContain("Joan Puig");
  });

  it('debería mostrar el detalle del estudiante en la ruta "/student/:id"', async () => {
    const { wrapper } = await mountApp("/student/1");

    expect(wrapper.text()).toContain("Detalle del alumno: Joan Puig");
    expect(wrapper.text()).toContain("joan.puig@test.com");
    expect(wrapper.text()).toContain("Volver al listado");
  });

  it("debería navegar al detalle del estudiante al hacer clic en un enlace", async () => {
    const { router, wrapper } = await mountApp("/");

    await wrapper.find(".list-group a").trigger("click");
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe("/student/1");
    expect(wrapper.text()).toContain("Detalle del alumno: Joan Puig");
  });

  it('debería navegar de vuelta a la lista al hacer clic en "Volver al listado"', async () => {
    const { router, wrapper } = await mountApp("/student/1");

    await wrapper.get('a[href="/"]').trigger("click");
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe("/");
    expect(wrapper.text()).toContain("Listado de alumnos");
  });
});