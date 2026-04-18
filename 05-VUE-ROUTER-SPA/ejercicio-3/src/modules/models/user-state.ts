export type UserRole = "Guest" | "Editor" | "Admin";

export interface UserState {
  isAuthenticated: boolean;
  role: UserRole;
}
