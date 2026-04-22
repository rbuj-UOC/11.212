import { reactive } from "vue";
import type { UserRole, UserState } from "@/modules/models/user-state";

const currentUser = reactive<UserState>({
  isAuthenticated: false,
  role: "Guest",
});

export function getCurrentUser(): UserState {
  return currentUser;
}

export function setCurrentUser(userState: UserState): void {
  currentUser.isAuthenticated = userState.isAuthenticated;
  currentUser.role = userState.role;
}

export function updateUserRole(role: UserRole): void {
  currentUser.role = role;
}

export function updateAuthentication(isAuthenticated: boolean): void {
  currentUser.isAuthenticated = isAuthenticated;
}
