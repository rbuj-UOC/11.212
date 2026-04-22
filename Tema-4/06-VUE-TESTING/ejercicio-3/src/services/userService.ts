export interface User {
  id: number;
  name: string;
}

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error("No se han podido cargar los usuarios");
  }

  const users = (await response.json()) as User[];

  return users.map(({ id, name }) => ({ id, name }));
}
