import { afterEach, describe, expect, it, vi } from "vitest";

import { getUsers } from "../../services/userService";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getUsers", () => {
  it("debería devolver la lista de usuarios cuando la respuesta es correcta", async () => {
    const mockUsers = [
      { id: 1, name: "Ana" },
      { id: 2, name: "Luis" },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUsers),
      }),
    );

    await expect(getUsers()).resolves.toEqual(mockUsers);
  });

  it("debería lanzar un error cuando la respuesta del servidor falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn(),
      }),
    );

    await expect(getUsers()).rejects.toThrow("No se han podido cargar los usuarios");
  });
});
