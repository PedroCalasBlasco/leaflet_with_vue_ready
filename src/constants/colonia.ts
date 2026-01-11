import type { Colonia } from '@/types/gatos'

export const coloniaService: Colonia = {
  id: 'col-001',
  nombre: 'Colonia Norte',
  latitud: '39.503',
  longitud: '-0.403',
  numero_gatos: 3,
  cuidador: {
    id: 'cuid-001',
    nombre: 'Ana',
    apellidos: 'Pérez',
    contacto: 'ana@cuidador.org',
  },
  gatos: [
    {
      nombre: 'Michi',
      sexo: 'Hembra',
      edad: 2,
      chip: 'CH123',
      fecha_captura: '2023-05-01',
      fecha_esterilizacion: '2023-05-01',
      veterinario: {
        id: 'vet-001',
        nombre: 'Juan',
        apellidos: 'Martínez',
        contacto: 'juan@vet.org',
      },
    },
    {
      nombre: 'Gato',
      sexo: 'Macho',
      edad: 4,
      chip: 'CH124',
      fecha_captura: '2022-06-10',
      fecha_esterilizacion: '2023-05-01',
      veterinario: {
        id: 'vet-002',
        nombre: 'Laura',
        apellidos: 'Ruiz',
        contacto: 'laura@vet.org',
      },
    },
    {
      nombre: 'Luna',
      sexo: 'Hembra',
      edad: 1,
      chip: 'CH125',
      fecha_captura: '2024-01-12',
      veterinario: {
        id: 'vet-001',
        nombre: 'Juan',
        apellidos: 'Martínez',
        contacto: 'juan@vet.org',
      },
    },
  ],
}
