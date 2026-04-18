import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/modules/landing/layouts/LandingLayout.vue"),
      children: [
        {
          path: "",
          redirect: { name: "products-search" },
        },
        {
          path: "filtros",
          name: "products-search",
          component: () => import("@/modules/products/pages/ProductSearchPage.vue"),
        },
        {
          path: "search",
          name: "products-results",
          component: () => import("@/modules/products/pages/ProductResultsPage.vue"),
        },
      ],
    },
  ],
});

export default router;
