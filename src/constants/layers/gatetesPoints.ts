import type { FeatureCollection, Point } from 'geojson'
import type { GateteProperties } from '@/types/layer'

export const gatetes: FeatureCollection<Point, GateteProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Punto A',
        type: 'escuela',
      },
      geometry: {
        type: 'Point',
        coordinates: [-0.3612, 39.5045],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Punto B',
        type: 'parque',
      },
      geometry: {
        type: 'Point',
        coordinates: [-0.3598, 39.5071],
      },
    },
  ],
}
