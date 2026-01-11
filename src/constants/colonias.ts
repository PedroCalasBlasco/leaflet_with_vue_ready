import type { Colonia } from '@/types/gatos'

export const colonias: Colonia[] = [
  {
    id: '1',
    nombre: 'Colonia Norte',
    latitud: '39.4875',
    longitud: '-0.3763',
    numero_gatos: 12,
    cuidador: {
      id: 'c1',
      nombre: 'Laura',
      apellidos: 'Martínez',
      contacto: 'laura@example.com',
    },
  },
  {
    id: '2',
    nombre: 'Colonia Centro',
    latitud: '39.4702',
    longitud: '-0.3768',
    numero_gatos: 8,
    cuidador: {
      id: 'c2',
      nombre: 'Carlos',
      apellidos: 'Gómez',
      contacto: 'carlos@example.com',
    },
  },
  {
    id: '3',
    nombre: 'Colonia Este',
    latitud: '39.4758',
    longitud: '-0.3550',
    numero_gatos: 15,
    cuidador: {
      id: 'c3',
      nombre: 'María',
      apellidos: 'López',
      contacto: 'maria@example.com',
    },
  },
  {
    id: '4',
    nombre: 'Colonia Sur',
    latitud: '39.4600',
    longitud: '-0.3755',
    numero_gatos: 10,
    cuidador: {
      id: 'c4',
      nombre: 'Javier',
      apellidos: 'Fernández',
      contacto: 'javier@example.com',
    },
  },
  {
    id: '5',
    nombre: 'Colonia Parque',
    latitud: '39.4801',
    longitud: '-0.3700',
    numero_gatos: 6,
    cuidador: {
      id: 'c5',
      nombre: 'Sara',
      apellidos: 'Ruiz',
      contacto: 'sara@example.com',
    },
  },
  {
    id: '6',
    nombre: 'Colonia Puerto',
    latitud: '39.4550',
    longitud: '-0.3420',
    numero_gatos: 20,
    cuidador: {
      id: 'c6',
      nombre: 'Miguel',
      apellidos: 'Sánchez',
      contacto: 'miguel@example.com',
    },
  },
]
