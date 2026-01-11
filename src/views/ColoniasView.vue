<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="6"><h4 class="text-h5 font-weight-bold">Colonias</h4></v-col>
      <v-col cols="6 text-end">
        <v-btn color="primary" @click="goToNewColonia">Nueva Colonia</v-btn>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-tabs v-model="tab" background-color="transparent" grow>
              <v-tab value="mapa">Mapa</v-tab>
              <v-tab value="tabla">Tabla</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-window v-model="tab">
          <v-window-item value="mapa">
            <div style="height: 600px">
              <MapComponent />
            </div>
          </v-window-item>
          <v-window-item value="tabla">
            <div>
              <ColoniasTable />
            </div>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import ColoniasTable from '@/components/colonias/ColoniasTable.vue'

  import MapComponent from '@/components/MapComponent.vue'
  import router from '@/router'
  import { ref } from 'vue'

  const tab = ref('mapa')

  function goToNewColonia() {
    router.push({ name: 'nuevacolonia' })
  }
</script>
