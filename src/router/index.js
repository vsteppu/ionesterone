// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from "pinia";

import Home from "../views/Home.vue";
import Saved from "../views/Saved.vue";
import Mobileapp from "../views/MobileApp.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import MySpace from "@/views/MySpace.vue";
import ForgotPassLink from "@/views/ForgotPassword.vue";



const routes = [
  { path: "/", name: Home, component: Home, meta: { requiresAuth: true } },
  { path: "/saved", name: Saved, component: Saved, meta: { requiresAuth: true } },
  { path: "/myspace", name: MySpace, component: MySpace, meta: { requiresAuth: false } },
  { path: "/forgotpasslink", name: ForgotPassLink, component: ForgotPassLink, meta: { requiresAuth: false } },
  { path: "/register", name: Register, component: Register, meta: { requiresAuth: false } },
  { path: "/login", name: Login, component: Login, meta: { requiresAuth: false } },
  { path: "/mobileapp", name: Mobileapp, component: Mobileapp, meta: { requiresAuth: false } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  if (!authStore.isAuthenticated() && to.meta.requiresAuth === true) {
    return { path: '/login' }
  } else {
    return true
  }
})

export default router