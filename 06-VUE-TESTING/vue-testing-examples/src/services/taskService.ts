export interface Task {
  id: number;
  title: string;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch('https://api.ejemplo.com/tasks');

  if (!response.ok) {
    throw new Error('Error al obtener las tareas');
  }

  return response.json();
}
