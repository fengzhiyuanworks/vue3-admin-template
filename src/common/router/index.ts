import {
  createRouter,
  createWebHashHistory,
  /* createWebHistory, */ RouteRecordRaw
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true,
      requireAuth: false
    },
    component: () => import("@/pages/home/index.vue")
  },
  {
    path: "/",
    name: "basicLayout",
    component: () => import("@/common/layouts/index.vue"),
    children: [
      {
        path: "/2",
        name: "Index2",
        meta: {
          title: "首页",
          keepAlive: true,
          requireAuth: true
        },
        component: () => import("@/pages/home/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export default router;
