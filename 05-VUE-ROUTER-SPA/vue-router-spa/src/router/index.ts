import HomePage from "@/modules/landing/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/modules/landing/pages/AboutPage.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/modules/landing/pages/ContactPage.vue"),
    },
  ],
});

export default router;
