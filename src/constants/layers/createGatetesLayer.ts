import L from 'leaflet'
import type { Feature, Point } from 'geojson'
import type { GateteProperties } from '@/types/layer'

export function createGatetesLayer(
  gatetes: GeoJSON.FeatureCollection<Point, GateteProperties>,
  onFeatureSelect: (feature: Feature<Point, GateteProperties>) => void
): { layer: L.GeoJSON; deselect: () => void } {
  let lastSelectedMarker: L.CircleMarker | null = null

  const defaultStyle: L.CircleMarkerOptions = {
    radius: 8,
    fillColor: 'red',
    color: 'blue',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  }

  const hoverStyle: L.CircleMarkerOptions = {
    radius: 10,
    fillColor: 'orange',
    color: 'yellow',
    weight: 3,
  }

  const selectedStyle: L.CircleMarkerOptions = {
    radius: 12,
    fillColor: '#00ffcc',
    color: '#0033ff',
    weight: 4,
    opacity: 1,
    fillOpacity: 0.8,
  }

  const applyStyle = (marker: L.CircleMarker, style: L.PathOptions) => {
    marker.setStyle(style)
  }

  const pointToLayer = (feature: Feature<Point, GateteProperties>, latlng: L.LatLng) => {
    const marker = L.circleMarker(latlng, defaultStyle)

    marker.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.type}`, {
      autoClose: false,
      closeOnClick: false,
    })

    marker.on('mouseover', () => {
      applyStyle(marker, hoverStyle)
      marker.openPopup()
    })

    marker.on('mouseout', () => {
      if (marker !== lastSelectedMarker) {
        applyStyle(marker, defaultStyle)
      }
      marker.closePopup()
    })

    marker.on('click', () => {
      if (lastSelectedMarker && lastSelectedMarker !== marker) {
        applyStyle(lastSelectedMarker, defaultStyle)
      }

      applyStyle(marker, selectedStyle)
      lastSelectedMarker = marker
      onFeatureSelect(feature)
    })

    return marker
  }

  const layer = L.geoJSON(gatetes, { pointToLayer })

  const deselect = () => {
    if (lastSelectedMarker) {
      lastSelectedMarker.setStyle(defaultStyle)
      lastSelectedMarker.closePopup()
      lastSelectedMarker = null
    }
  }

  return { layer, deselect }
}
