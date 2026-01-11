import type { Gato } from '@/types/gatos'

import { colonias } from '@/constants/colonias' // Asegurate que esto esté bien importado
const veterinarioEjemplo = {
  id: 'v1',
  nombre: 'Ana',
  apellidos: 'Serrano',
  contacto: 'ana.vet@example.com',
}

export const gatos: Gato[] = Array.from({ length: 20 }, (_, i) => {
  const sexo = i % 2 === 0 ? 'Macho' : 'Hembra'
  const nombre =
    sexo === 'Macho'
      ? ['Leo', 'Simba', 'Tom', 'Felix', 'Toby', 'Nico', 'Pepe', 'Rocky', 'Loki', 'Max'][i / 2]
      : ['Luna', 'Mia', 'Nina', 'Kira', 'Sasha', 'Cleo', 'Lola', 'Nala', 'Arya', 'Olivia'][
          (i - 1) / 2
        ]

  return {
    nombre,
    sexo,
    edad: Math.floor(Math.random() * 15) + 1,
    chip: `CHIP-${1000 + i}`,
    fecha_captura: `2023-${((i % 12) + 1).toString().padStart(2, '0')}-15`,
    vacunas: [
      {
        id: `vac-${i}`,
        nombre: 'Rabia',
        fecha: `2023-${((i % 12) + 1).toString().padStart(2, '0')}-20`,
      },
    ],
    colonia: colonias[i % colonias.length],
    veterinario: veterinarioEjemplo,
    documentos: [
      {
        id: `doc-${i}`,
        nombre: 'Certificado de vacunación',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fecha: `2024-${((i % 12) + 1).toString().padStart(2, '0')}-10`,
      },
    ],
  }
})
