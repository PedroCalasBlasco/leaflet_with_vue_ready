<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="6"><h4 class="text-h5 font-weight-bold">Gatos</h4></v-col>
      <v-col cols="6 text-end">
        <v-btn color="primary" @click="goToNewGato">Nuevo Gato</v-btn>
      </v-col>
      <v-col cols="12">
        <GatosTable show-filters show-pagination :items-per-page="10" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import router from '@/router'
  import GatosTable from '../components/GatosTable.vue'

  function goToNewGato() {
    router.push({ name: 'nuevogato' })
  }
</script>
