import {createRouter, createWebHashHistory} from "vue-router";

let routes = [
  {
    path: "/",
    name: "login",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/Login/index.vue"),
    meta: {
      keepAlive: false,
      title: "登录页",
    },
  },

];


// 路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


