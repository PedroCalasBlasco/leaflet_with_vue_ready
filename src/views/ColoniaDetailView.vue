<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="12">
        <h4 class="text-h5 font-weight-bold">{{ colonia?.nombre }}</h4>
      </v-col>

      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="8">
            <v-card class="mb-4">
              <v-card-title>Información Básica</v-card-title>
              <v-card-text class="mt-4">
                <v-row no-gutters>
                  <v-col>
                    <p>
                      <strong>Cuidador:</strong>
                      {{ colonia?.cuidador.nombre }} {{ colonia?.cuidador.apellidos }}
                    </p>
                  </v-col>
                  <v-col class="text-center">
                    <p>
                      <strong>Contacto:</strong>
                      {{ colonia?.cuidador.contacto }}
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="mb-2 bg-pink-lighten-5">
              <v-card-title>Cantidad</v-card-title>
              <v-card-text class="mt-2 text-center">
                <h2>44</h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4">
              <v-card-text v-if="colonia" class="mt-4">
                <ColoniaCharts v-model:colonia="colonia" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-text class="mt-4">
            <v-row no-gutters>
              <v-col cols="12"><div ref="mapContainer" class="map" /></v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { coloniaService } from '@/constants/colonia'
  import type { Colonia } from '@/types/gatos'
  import ColoniaCharts from '@/components/colonias/ColoniaCharts.vue'
  import L from 'leaflet'

  const colonia = ref<Colonia>()

  const mapContainer = ref<HTMLElement>()
  const mapInstance = ref<L.Map>()
  const bounds = L.latLngBounds(L.latLng(39.47, -0.42), L.latLng(39.53, -0.31))

  onMounted(() => {
    colonia.value = coloniaService

    if (mapContainer.value) {
      const map = L.map(mapContainer.value, {
        center: [39.507, -0.365],
        zoom: 17,
        minZoom: 15,
        maxZoom: 18,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
      })

      mapInstance.value = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      // const marker = L.marker([marcadorData.lat, marcadorData.lng], {
      //   icon: defaultIcon,
      //   title: marcadorData.nombre,
      // }).addTo(map)
    }
  })
</script>

<style lang="scss" scoped>
  .map {
    height: 380px;
    width: 100%;
  }
</style>
