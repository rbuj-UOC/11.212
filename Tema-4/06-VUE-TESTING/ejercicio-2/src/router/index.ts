import StudentList from "@/modules/students/pages/StudentList.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouterHistory,
} from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/modules/landing/layouts/LandingLayout.vue"),
    children: [
      {
        path: "",
        component: StudentList,
      },
      {
        path: "student/:id",
        name: "student-detail",
        component: () => import("@/modules/students/pages/StudentDetail.vue"),
        props: true,
      },
    ],
  },
];

export const createAppRouter = (
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
) =>
  createRouter({
    history,
    routes,
  });

const router = createAppRouter();

export default router;
