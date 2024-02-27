// Composables
import { createRouter, createWebHistory } from "vue-router";
import i18n from "../plugins/i18n";
import nProgress from "nprogress";
import { RT_HOME } from "@/constants/home";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/default/Default.vue"),
      children: [
        {
          path: "",
          name: RT_HOME,
          component: () => import("@/views/Home.vue"),
        },
      ],
    },
  ],
});

router.beforeResolve((to, from, next) => {
  if (typeof to.meta?.title === "string") {
    updateMeta(to.meta?.title);
  }
  nProgress.start();
  next();
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const name = to.name === "login";

  if (!token && !name) {
    return next({ name: "login" });
  } else {
    next();
  }
});

router.afterEach(() => {
  nProgress.done();
});

function updateMeta(title: string) {
  if (typeof title === "string") {
    document.title = i18n.global.t(title);
  }
}

export { updateMeta };
export default router;
