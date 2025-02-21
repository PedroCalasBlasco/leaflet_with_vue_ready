<template>
  <div ref="mapContainer" class="map" :class="{ 'dark-theme': theme === 'dark' }"></div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, watchEffect } from 'vue'
  import L from 'leaflet'
  import { baseMaps, defaultMap } from '../constants/baseMaps'
  import { center, defaultZoom } from '../constants/mapConfig'
  import { basemapsControl } from '../components/basemapsControl/basemapControl'
  import { polygon } from '../constants/layers/polygon'
  import { type CustomControlOptions } from '../types/mapControl'
  import { type Theme } from '../types/config'

  import { useStorage } from '@vueuse/core'

  const theme = useStorage<Theme>('theme', 'light')

  const mapContainer = ref<HTMLElement | null>(null)

  const mapInstance = ref<L.Map | null>(null)
  const basemapControlInstance = ref<L.Control | null>(null)

  const addBasemapsControl = (map: L.Map) => {
    const control = new (basemapsControl as unknown as {
      new (options: CustomControlOptions): L.Control
    })({
      position: 'bottomright',
      theme: theme.value,
    })

    map.addControl(control)
    return control
  }

  watch(theme, () => {
    if (mapInstance.value && basemapControlInstance) {
      if (basemapControlInstance.value) {
        mapInstance.value.removeControl(basemapControlInstance.value)
      }
      if (mapInstance.value instanceof L.Map)
        basemapControlInstance.value = addBasemapsControl(mapInstance.value)
    }
  })

  // watchEffect(() => {
  //   if (theme.value === 'dark') {
  //     document.body.classList.add('dark-theme')
  //   } else {
  //     document.body.classList.remove('dark-theme')
  //   }
  // })

  onMounted(() => {
    if (!mapContainer.value) return
    const map = L.map(mapContainer.value).setView(center, defaultZoom)
    mapInstance.value = map

    defaultMap.addTo(map)
    L.geoJSON(polygon).addTo(map)
    L.control.layers(baseMaps).addTo(map)

    basemapControlInstance.value = addBasemapsControl(map)
  })
</script>

<style scoped lang="scss">
  .map {
    height: 100%;
    width: 100%;
  }
</style>
