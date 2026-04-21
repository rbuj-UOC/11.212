import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CounterFactorial from '@/components/CounterFactorial.vue';

describe('CounterFactorial.vue', () => {
  it('debería mostrar el contador en 0 y el factorial en 1 al iniciarse', () => {
    // Arrange (Preparar)
    const wrapper = mount(CounterFactorial);

    // Act (Actuar)
    const textoContador = wrapper.get('[data-test="contador"]').text();
    const textoFactorial = wrapper.get('[data-test="factorial"]').text();

    // Assert (Comprobar)
    expect(textoContador).toContain('0');
    expect(textoFactorial).toContain('1');
  });

  it('debería incrementar el contador al hacer clic en el botón', async () => {
    // Arrange
    const wrapper = mount(CounterFactorial);
    const boton = wrapper.get('[data-test="btn-incrementar"]');

    // Act
    await boton.trigger('click');

    const textoContador = wrapper.get('[data-test="contador"]').text();
    const textoFactorial = wrapper.get('[data-test="factorial"]').text();

    // Assert
    expect(textoContador).toContain('1');
    expect(textoFactorial).toContain('1');
  });

  it('debería calcular correctamente el factorial tras varios incrementos', async () => {
    // Arrange
    const wrapper = mount(CounterFactorial);
    const boton = wrapper.get('[data-test="btn-incrementar"]');

    // Act
    await boton.trigger('click');
    await boton.trigger('click');
    await boton.trigger('click');

    const textoContador = wrapper.get('[data-test="contador"]').text();
    const textoFactorial = wrapper.get('[data-test="factorial"]').text();

    // Assert
    expect(textoContador).toContain('3');
    expect(textoFactorial).toContain('6');
  });
});
