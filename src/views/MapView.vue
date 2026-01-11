<template>
  <div ref="mapContainer" class="map" :class="{ 'dark-theme': theme === 'dark' }"></div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, type PropType } from 'vue'
  import type { Feature, Point } from 'geojson'
  import L, { Layer, type LeafletMouseEvent } from 'leaflet'
  import { defaultMap } from '../constants/basemaps'
  import { center, defaultZoom } from '../constants/mapConfig'
  import { basemapsControl } from '../components/widgets/basemapsControl/basemapControl'
  import { gatetes } from '../constants/layers/gatetesPoints'
  import { perretes } from '../constants/layers/perretesPoints'
  import { type CustomControlOptions } from '../types/mapControl'
  import { type Theme } from '../types/config'
  import { useStorage, useVModel } from '@vueuse/core'
  import type { GateteProperties } from '@/types/layer'
  import { createGatetesLayer } from '@/constants/layers/createGatetesLayer'
  import { createPerretesLayer } from '@/constants/layers/createPerretesLayer'

  const props = defineProps({
    selectedItem: String,
    selectedFeature: Object as PropType<Feature<Point, GateteProperties>>,
  })

  const emit = defineEmits<{
    (e: 'update:selectedFeature', value: Feature<Point, GateteProperties> | undefined): void
    (e: 'update:selectedItem', arg: string): void
  }>()

  const selectedFeature = useVModel(props, 'selectedFeature', emit)
  const selectedItem = useVModel(props, 'selectedItem', emit)

  const theme = useStorage<Theme>('theme', 'light')
  const mapContainer = ref<HTMLElement | null>(null)
  const mapInstance = ref<L.Map | null>(null)
  const basemapControlInstance = ref<L.Control | null>(null)

  let deselect: () => void = () => {}
  let currentLayer: L.Layer | null = null

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

  // Función para actualizar la capa según selectedItem
  const updateLayer = (newValue: string | undefined) => {
    if (!mapInstance.value) return

    if (currentLayer) {
      mapInstance.value.removeLayer(currentLayer)
      currentLayer = null
    }

    let result: { layer: Layer; deselect: () => void } | null = null

    if (newValue === 'cat1') {
      result = createGatetesLayer(gatetes, (f) => (selectedFeature.value = f))
    } else if (newValue === 'cat2') {
      result = createPerretesLayer(perretes, (f) => (selectedFeature.value = f))
    }

    if (result) {
      result.layer.addTo(mapInstance.value as L.Map)
      currentLayer = result.layer
      deselect = result.deselect
    }
  }

  watch(theme, () => {
    if (mapInstance.value && basemapControlInstance.value) {
      mapInstance.value.removeControl(basemapControlInstance.value)
      basemapControlInstance.value = addBasemapsControl(mapInstance.value as L.Map)
    }
  })

  watch(
    () => selectedFeature.value,
    (feature) => {
      if (!feature) {
        deselect() // Deselecciona visualmente el punto
      }
    }
  )

  watch(
    () => selectedItem.value,
    (newValue) => {
      updateLayer(newValue)
    }
  )

  onMounted(() => {
    if (!mapContainer.value) return
    const southWest = L.latLng(39.47, -0.42)
    const northEast = L.latLng(39.53, -0.31)
    const bounds = L.latLngBounds(southWest, northEast)

    const map = L.map(mapContainer.value, {
      center: [39.507, -0.365],
      zoom: 17, // zoom inicial centrado
      minZoom: 15, // zoom mínimo
      maxZoom: 18, // zoom máximo
      maxBounds: bounds,
      maxBoundsViscosity: 1.0, // bloqueo total fuera de límites
    })

    mapInstance.value = map

    defaultMap.addTo(map)

    basemapControlInstance.value = addBasemapsControl(map)

    // Llamar updateLayer con valor inicial una vez creado el mapa
    updateLayer(selectedItem.value)

    map.on('click', function (e: LeafletMouseEvent) {
      const clickedTarget = e.originalEvent?.target as HTMLElement | null
      if (clickedTarget?.closest('.leaflet-interactive')) return

      deselect()
      selectedFeature.value = undefined
    })
  })
</script>

<style scoped lang="scss">
  .map {
    height: 100%;
    width: 100%;
  }
</style>
