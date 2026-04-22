import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../App.vue";

describe("App", () => {
  it("debe mostrar un input cuando se selecciona Cuadrado", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("square");

    expect(wrapper.findAll('input[type="number"]').length).toBe(1);
  });

  it("debe calcular correctamente el área del Cuadrado", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("square");
    await wrapper.find('[data-test="square-side"]').setValue("5");

    expect(wrapper.find('[data-test="area"]').text()).toContain("25.00");
  });

  it("debe mostrar la fórmula correcta del Cuadrado", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("square");

    expect(wrapper.find('[data-test="formula"]').text()).toContain("Área = lado × lado");
  });

  it("debe mostrar dos inputs cuando se selecciona Rectángulo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("rectangle");

    expect(wrapper.findAll('input[type="number"]').length).toBe(2);
  });

  it("debe calcular correctamente el área del Rectángulo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("rectangle");
    await wrapper.find('[data-test="rectangle-base"]').setValue("6");
    await wrapper.find('[data-test="rectangle-height"]').setValue("4");

    expect(wrapper.find('[data-test="area"]').text()).toContain("24.00");
  });

  it("debe mostrar la fórmula correcta del Rectángulo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("rectangle");

    expect(wrapper.find('[data-test="formula"]').text()).toContain("Área = base × altura");
  });

  it("debe mostrar un input cuando se selecciona Círculo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("circle");

    expect(wrapper.findAll('input[type="number"]').length).toBe(1);
  });

  it("debe calcular correctamente el área del Círculo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("circle");
    await wrapper.find('[data-test="circle-radius"]').setValue("5");

    expect(wrapper.find('[data-test="area"]').text()).toContain("78.54");
  });

  it("debe mostrar la fórmula correcta del Círculo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("circle");

    expect(wrapper.find('[data-test="formula"]').text()).toContain("Área = π × radio²");
  });

  it("debe mostrar dos inputs cuando se selecciona Triángulo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("triangle");

    expect(wrapper.findAll('input[type="number"]').length).toBe(2);
  });

  it("debe calcular correctamente el área del Triángulo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("triangle");
    await wrapper.find('[data-test="triangle-base"]').setValue("6");
    await wrapper.find('[data-test="triangle-height"]').setValue("6");

    expect(wrapper.find('[data-test="area"]').text()).toContain("18.00");
  });

  it("debe mostrar la fórmula correcta del Triángulo", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-test="shape-select"]').setValue("triangle");

    expect(wrapper.find('[data-test="formula"]').text()).toContain("Área = (base × altura) / 2");
  });
});
