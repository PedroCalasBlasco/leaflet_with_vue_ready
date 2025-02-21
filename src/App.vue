<template>
  <v-app :theme="theme">
    <v-app-bar>
      <div class="d-flex justify-space-between" style="width: 100%">
        <div>
          <h2 class="title ml-8">Mi Plantilla</h2>
        </div>
        <div class="d-flex flex-row">
          <v-select
            :model-value="theme"
            density="compact"
            label="Theme"
            :items="avaliableThemes"
            @update:model-value="theme = $event"
          ></v-select>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer :width="199">
      <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="List Item 1"></v-list-item>
      <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item link title="List Item 3"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { useStorage } from '@vueuse/core'
  import { type Theme } from './types/config'
  const avaliableThemes = ['light', 'dark'] as const
  const theme = useStorage<Theme>('theme', 'light')
</script>

<style lang="scss">
  .full-height {
    height: calc(100vh - 72px) !important;
  }
  .scroll-y {
    overflow-y: auto;
  }
</style>
