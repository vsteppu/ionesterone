// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from "pinia";

import Home from "../views/Home.vue";
import Gallery from "../views/Gallery.vue";
import Contacts from "@/views/Contacts.vue";
import About from "@/views/About.vue";

const routes = [
  { path: "/", name: Home, component: Home, meta: { requiresAuth: false } },
  { path: "/gallery", name: Gallery, component: Gallery, meta: { requiresAuth: true } },
  { path: "/about", name: About, component: About, meta: { requiresAuth: false } },
  { path: "/contacts", name: Contacts, component: Contacts, meta: { requiresAuth: false } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router