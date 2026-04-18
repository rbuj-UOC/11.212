import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "@/modules/models/user-service";
import type { UserRole } from "@/modules/models/user-state";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/modules/landing/layouts/LandingLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("@/modules/roles/components/Guest.vue"),
        },
        {
          path: "admin/config",
          component: () => import("@/modules/roles/components/AdminConfig.vue"),
          meta: { allowedRoles: ["Admin"] satisfies UserRole[] },
        },
        {
          path: "admin/editor",
          component: () => import("@/modules/roles/components/EditorPanel.vue"),
          meta: { allowedRoles: ["Editor", "Admin"] satisfies UserRole[] },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const allowedRoles = to.meta.allowedRoles as UserRole[] | undefined;

  if (!allowedRoles) {
    return true;
  }

  const currentUser = getCurrentUser();
  const isAllowed = allowedRoles.includes(currentUser.role);

  if (isAllowed) {
    return true;
  }

  const reason = currentUser.isAuthenticated
    ? `rol insuficiente: ${currentUser.role}`
    : `usuario no autenticado: ${currentUser.role}`;

  console.warn(`Acceso denegado a ${String(to.path)}. Motivo: ${reason}.`);

  return { path: "/" };
});

export default router;
