import {
  createRouter,
  createWebHashHistory,
  /* createWebHistory, */ RouteRecordRaw
} from "vue-router";
import setPermission from "./permission";

/* 动态获取pages下 router 配置 */
const getPagesRouterList = () => {
  const files: any = (import.meta as any).glob("@/pages/*/router(.js|.ts)", { eager: true });
  const _layoutRoutes: any[] = [];

  Object.keys(files).forEach((key) => {
    if (!/router\.(js|ts)$/.test(key)) return;
    _layoutRoutes.push(...files[key].default);
  });
  return _layoutRoutes;
};
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "basicLayout",
    component: () => import("@/common/layouts/index.vue"),
    children: [...getPagesRouterList()]
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "403",
      type: "blank"
    },
    component: () => import("@/pages/common/403.vue")
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
      type: "blank"
    },
    component: () => import("@/pages/common/404.vue")
  },
  {
    path: "/:pathMatch(.*)", // 最后注册其余所有路由跳转404页面
    redirect: "/404"
  }
];

console.log("routes", routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export default setPermission(router);
