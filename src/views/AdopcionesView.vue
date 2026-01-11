<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="6"><h4 class="text-h5 font-weight-bold">Adopciones</h4></v-col>
      <v-col cols="6 text-end">
        <v-btn color="primary">Nueva Adopción</v-btn>
      </v-col>
      <v-col cols="12">
        <AdopcionesTable show-filters show-pagination :items-per-page="10" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import AdopcionesTable from '@/components/AdopcionesTable.vue'
</script>
