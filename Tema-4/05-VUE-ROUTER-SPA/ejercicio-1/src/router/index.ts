import StudentList from "@/modules/students/pages/StudentList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/modules/landing/layouts/LandingLayout.vue"),
      children: [
        {
          path: "/",
          component: StudentList,
        },
        {
          path: "students/:id",
          name: "student-detail",
          component: () => import("@/modules/students/pages/StudentDetail.vue"),
          props: true,
        },
      ],
    },
  ],
});

export default router;
