import { describe, expect, it } from "vitest";
import { sumar } from "@/utils/math";

describe("función sumar", () => {
  it("debería devolver la suma de dos números positivos", () => {
    // Arrange (Preparar)
    const a = 2;
    const b = 3;

    // Act (Actuar)
    const resultado = sumar(a, b);

    // Assert (Afirmar/Comprobar)
    expect(resultado).toBe(5);
  });

  it("debería funcionar con números negativos", () => {
    // Arrange
    const a = -5;
    const b = 10;

    // Act
    const resultado = sumar(a, b);

    // Assert
    expect(resultado).toBe(5);
  });

  it("debería devolver el mismo número si uno de los operadores es 0", () => {
    // Arrange
    const a = 7;
    const b = 0;

    // Act
    const resultado = sumar(a, b);

    // Assert
    expect(resultado).toBe(7);
  });
});
