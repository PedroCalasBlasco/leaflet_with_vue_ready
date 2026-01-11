import type { Adopcion } from '@/types/gatos'

export const adopciones: Adopcion[] = [
  {
    fecha: '2024-05-12',
    cuidador: {
      id: '1',
      nombre: 'Laura',
      apellidos: 'Pérez',
      contacto: 'laura@example.com',
    },
    gato: {
      nombre: 'Michi',
      sexo: 'Hembra',
      edad: 2,
      chip: '1234567890',
      fecha_captura: '2023-06-01',
      colonia: {
        nombre: 'Colonia Centro',
        id: 'c1',
        latitud: '39.4699',
        longitud: '-0.3763',
        cuidador: {
          id: '2',
          nombre: 'Luis',
          apellidos: 'García',
          contacto: 'luis@example.com',
        },
      },
      veterinario: {
        id: 'v1',
        nombre: 'Veterinaria Central',
        apellidos: '',
        contacto: '999-888-777',
      },
    },
  },
  // Agregá más adopciones si querés
]
