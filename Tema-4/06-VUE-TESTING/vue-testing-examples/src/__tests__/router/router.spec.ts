import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "@/App.vue";
import CounterFactorial from "@/components/CounterFactorial.vue";
import AboutView from "@/components/AboutView.vue";

// Definimos un router de prueba:
function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "home", component: CounterFactorial },
      { path: "/about", name: "about", component: AboutView },
    ],
  });
}

describe("Routing básico", () => {
  it('debería mostrar el contador en la ruta raíz "/"', async () => {
    // Arrange
    const router = createTestRouter();
    await router.push("/"); // fijamos la ruta
    await router.isReady(); // esperamos a que cargue

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Act
    const texto = wrapper.html();

    // Assert
    expect(texto).toContain("Contador:");
  });

  it('debería mostrar la página About en la ruta "/about"', async () => {
    // Arrange
    const router = createTestRouter();
    await router.push("/about");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Act
    const texto = wrapper.html();

    // Assert
    expect(texto).toContain("Página About");
  });

  it("debería navegar a About al hacer clic en el enlace", async () => {
    // Arrange
    const router = createTestRouter();
    await router.push("/"); // empezamos en la home
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    const linkAbout = wrapper.get('[data-test="link-about"]');

    // Act
    await linkAbout.trigger("click");
    await flushPromises(); // esperamos a que se complete la navegación

    // Assert
    expect(router.currentRoute.value.path).toBe("/about");
    expect(wrapper.html()).toContain("Página About");
  });
});
