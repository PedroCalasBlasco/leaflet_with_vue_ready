<template>
  <v-container fluid class="overflow-y-auto">
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <h4 class="text-h5 font-weight-bold">Resumen</h4>
          </v-col>
        </v-row>
        <v-row>
          <ResumenComponent />
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column fill-height">
          <div>
            <h4 class="text-h5 font-weight-bold">Situación Colonias</h4>
          </div>
          <div class="flex-grow-1">
            <MapComponent class="w-100 h-100" />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12"><h4 class="text-h5 font-weight-bold">Últimas Adopciones</h4></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <AdopcionesTable :items-per-page="4" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <h4 class="text-h5 font-weight-bold">Registro de Incidencias</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <GatosTable :items-per-page="4" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import ResumenComponent from '@/components/ResumenComponent.vue'
  import GatosTable from '../components/GatosTable.vue'
  import MapComponent from '@/components/MapComponent.vue'
  import AdopcionesTable from '@/components/AdopcionesTable.vue'
</script>

<style scoped>
  .border {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
</style>
