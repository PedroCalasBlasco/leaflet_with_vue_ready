import { createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import GatosView from '@/views/GatosView.vue'
import ColoniasView from '@/views/ColoniasView.vue'
import AdopcionesView from '@/views/AdopcionesView.vue'
import GatoDetailView from '@/views/GatoDetailView.vue'
import GatoNewEditView from '@/views/GatoNewEditView.vue'
import ColoniaDetailView from '@/views/ColoniaDetailView.vue'
import ColoniaNewEditView from '@/views/ColoniaNewEditView.vue'
import LoginView from '@/views/LoginView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/colonias',
    name: 'colonias',
    component: ColoniasView,
  },
  {
    path: '/colonia/:id',
    name: 'colonia',
    component: ColoniaDetailView,
  },
  {
    path: '/nuevacolonia',
    name: 'nuevacolonia',
    component: ColoniaNewEditView,
  },
  {
    path: '/editcolonia/:id',
    name: 'editarcolonia',
    component: ColoniaNewEditView,
  },
  {
    path: '/gatos',
    name: 'gatos',
    component: GatosView,
  },
  {
    path: '/gato/:id',
    name: 'gato',
    component: GatoDetailView,
  },
  {
    path: '/nuevogato',
    name: 'nuevogato',
    component: GatoNewEditView,
  },
  {
    path: '/editargato/:id',
    name: 'editargato',
    component: GatoNewEditView,
  },
  {
    path: '/adopciones',
    name: 'adopciones',
    component: AdopcionesView,
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
