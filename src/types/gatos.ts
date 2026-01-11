export interface Colonia {
  nombre: string
  id: string
  latitud: string
  longitud: string
  cuidador: Cuidador
  numero_gatos: number
  gatos: Gato[]
}

export interface Gato {
  nombre: string
  sexo: string
  edad: number
  chip: string
  fecha_captura: string
  fecha_retorno?: string
  vacunas?: Vacuna[]
  fecha_fallecimiento?: string
  colonia?: Colonia
  veterinario: Veterinario
  adopcion?: Adopcion
  fecha_esterilizacion?: string
  documentos?: Documento[]
}

export interface Documento {
  id: string
  nombre: string
  url: string
  fecha: string
}

export interface Adopcion {
  fecha: string
  cuidador: Cuidador
  gato: Gato
}

export interface Vacuna {
  id: string
  nombre: string
  fecha: string
}

export interface Veterinario {
  id: string
  nombre: string
  apellidos: string
  contacto: string
}

export interface Cuidador {
  id: string
  nombre: string
  apellidos: string
  contacto: string
}
