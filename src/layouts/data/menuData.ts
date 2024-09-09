import { Menus } from "./menuType";

export const menuData: Menus[] = [
  {
    id: "0",
    title: "系统首页",
    index: "/dashboard",
    icon: "Odometer",
  },
  {
    id: "1",
    title: "文章管理",
    index: "1",
    icon: "Odometer",
    children: [
      {
          id: "11",
          pid: "1",
          index: "/article-publish",
          title: "发布文章",
      },
      {
        id: "12",
        pid: "1",
        index: "/article-edit",
        title: "修改文章",
      },
      {
        id: "13",
        pid: "1",
        index: "/article-view",
        title: "查看文章",
      },
    ],
  },
];
