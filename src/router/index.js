import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home.vue"),
    redirect: "/home/admin",
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("../views/admin.vue"),
      },
      {
        path: "article",
        name: "article",
        component: () => import("../views/article.vue"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("../views/video.vue"),
      },
      {
        path: "album",
        name: "album",
        component: () => import("../views/album.vue"),
      },
      {
        path: "info",
        name: "info",
        component: () => import("../views/info.vue"),
      },
      {
        path: "message",
        name: "message",
        component: () => import("../views/message.vue"),
      },
      {
        path: "articleDetail",
        name: "articleDetail",
        component: () => import("../views/articleDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
