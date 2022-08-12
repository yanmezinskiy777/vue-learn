import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import Posts from "../pages/Posts.vue";
import Post from "../pages/Post.vue";
import PostsVuex from "../pages/PostsVuex.vue"

const routes = [
  { path: "/", component: Main },
  { path: "/posts", component: Posts },
  { path: "/posts-vuex", component: PostsVuex },
  { path: "/posts/:id", component: Post },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
