import { describe, it, expect, vi } from 'vitest';
import { getTasks } from '@/services/taskService';

describe('taskService.ts', () => {
  it('debería devolver la lista de tareas cuando la respuesta es correcta', async () => {
    // Arrange (Preparar)
    const tareasMock: Task = [
      { id: 1, title: 'Aprender Vue' },
      { id: 2, title: 'Aprender Testing' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(tareasMock),
      }),
    );

    // Act (Actuar)
    const resultado = await getTasks();

    // Assert (Comprobar)
    expect(resultado).toEqual(tareasMock);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('debería lanzar un error cuando la respuesta del servidor falla', async () => {
    // Arrange
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    // Act & Assert
    await expect(getTasks()).rejects.toThrow('Error al obtener las tareas');
  });
});
