<template>
  <div class="map-container">
    <div ref="mapContainer" class="map" />

    <Transition name="slide">
      <v-card v-if="selectedMarker" class="sidebar" elevation="0">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>{{ selectedMarker.nombre }}</span>
          <v-btn icon size="small" variant="text" @click="closeSidebar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <p>
            <strong>Nombre:</strong>
            {{ selectedMarker.nombre }}
          </p>
          <p>
            <strong>Descripción:</strong>
            {{ selectedMarker.descripcion }}
          </p>
        </v-card-text>
      </v-card>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import L from 'leaflet'

  // Datos del marcador
  const marcadorData = {
    lat: 39.507,
    lng: -0.365,
    nombre: 'Colonia San Pedro',
    descripcion: 'Una colonia activa con varios gatos cuidados.',
  }

  const mapContainer = ref<HTMLElement | null>(null)
  const mapInstance = ref<L.Map | null>(null)
  const selectedMarker = ref<typeof marcadorData | null>(null)
  const markerRef = ref<L.Marker | null>(null)

  // Icono por defecto
  const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  })

  const highlightedIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  })

  onMounted(() => {
    if (!mapContainer.value) return

    const bounds = L.latLngBounds(L.latLng(39.47, -0.42), L.latLng(39.53, -0.31))

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

    const marker = L.marker([marcadorData.lat, marcadorData.lng], {
      icon: defaultIcon,
      title: marcadorData.nombre,
    }).addTo(map)

    markerRef.value = marker

    // Hover popup
    marker.bindPopup(marcadorData.nombre)
    marker.on('mouseover', () => marker.openPopup())
    marker.on('mouseout', () => marker.closePopup())

    // Click → cambiar icono y mostrar panel
    marker.on('click', () => {
      selectedMarker.value = marcadorData
      marker.setIcon(highlightedIcon)
    })

    // Click en el mapa → círculo temporal
    map.on('click', (e: L.LeafletMouseEvent) => {
      const clickCircle = L.circle(e.latlng, {
        radius: 5,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
      }).addTo(map)

      setTimeout(() => {
        map.removeLayer(clickCircle)
      }, 500)
    })
  })

  function closeSidebar() {
    selectedMarker.value = null
    if (markerRef.value) {
      markerRef.value.setIcon(defaultIcon)
    }
  }
</script>

<style lang="scss" scoped>
  .map-container {
    display: flex;
    position: relative;
    height: 100vh;
  }

  .map {
    flex: 1;
  }

  .sidebar {
    width: 300px;
    padding: 16px;
    background-color: #fff;
    border-left: 1px solid #ccc;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
</style>
