import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "admin",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
          KeepAlive: false,
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/Login/index.vue"),
    meta: {
      keepAlive: false,
      title: "登录页",
    },
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
  //   component: () => import("@/views/dashboard/index.vue"),
  //   meta: {
  //     keepAlive: false,
  //     title: '系统首页',
  //   },
  // }
];

// 路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
