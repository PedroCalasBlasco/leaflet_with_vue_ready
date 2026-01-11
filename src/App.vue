<template>
  <v-app :theme="theme">
    <v-app-bar v-if="!isLogin" flat color="white" class="px-4">
      <v-toolbar-title class="text-h6 font-weight-bold">
        Gestión de Colonias Felinas
      </v-toolbar-title>

      <v-spacer />

      <v-btn variant="text" class="text-capitalize" to="/dashboard">Inicio</v-btn>
      <v-btn variant="text" class="text-capitalize" to="/colonias">Colonias</v-btn>
      <v-btn variant="text" class="text-capitalize" to="/gatos">Gatos</v-btn>
      <v-btn variant="text" class="text-capitalize" to="/adopciones">Adopciones</v-btn>
      <v-btn variant="text" class="text-capitalize" to="/incidencias">Incidencias</v-btn>

      <v-btn class="ml-4 text-capitalize" color="primary" variant="flat" to="/informes">
        Informes
      </v-btn>
    </v-app-bar>

    <!-- FLEX layout bajo la app-bar -->
    <div class="d-flex layout-below-bar">
      <!-- Contenido principal -->
      <v-main class="main-area overflow-y-auto">
        <router-view
          v-model:selected-feature="selectedFeature"
          v-model:selected-item="selectedItem"
        />
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { useStorage } from '@vueuse/core'
  import { type Theme } from './types/config'
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const avaliableThemes = ['light', 'dark'] as const
  const theme = useStorage<Theme>('theme', 'light')

  const selectedItem = ref('cat1')

  const selectedFeature = ref<GeoJSON.Feature>()

  const isLogin = computed(() => {
    return route.name === 'login'
  })
</script>

<style lang="scss">
  .layout-below-bar {
    height: calc(100vh); // Ajusta si la app-bar es más alta
  }

  .info-panel {
    width: 200px;
    background: #f8f8f8;
    border-left: 1px solid #ccc;
  }

  .main-area {
    flex: 1;
    min-width: 0;
  }
</style>
