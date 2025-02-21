import { createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'

import MainMap from '../views/MapView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/default',
    component: MainMap,
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
