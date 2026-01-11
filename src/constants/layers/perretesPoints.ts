import type { FeatureCollection, Point } from 'geojson'
import type { PerreteProperties } from '@/types/layer'

export const perretes: FeatureCollection<Point, PerreteProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Centro Cultural',
        type: 'cultura',
        description: 'Edificio donde se realizan actividades culturales.',
      },
      geometry: {
        type: 'Point',
        coordinates: [-0.3585, 39.5052],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Polideportivo',
        type: 'deporte',
        description: 'Instalaciones deportivas municipales.',
      },
      geometry: {
        type: 'Point',
        coordinates: [-0.3621, 39.5083],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Biblioteca',
        type: 'educación',
        description: 'Biblioteca pública de Tavernes.',
      },
      geometry: {
        type: 'Point',
        coordinates: [-0.3604, 39.5061],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Centro de Salud',
        type: 'salud',
        description: 'Centro de atención primaria.',
      },
      geometry: {
        type: 'Point',
        coordinates: [-0.3577, 39.5049],
      },
    },
  ],
}
