<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="12">
        <h4 class="text-h5 font-weight-bold">{{ gato?.nombre }}</h4>
      </v-col>
    </v-row>

    <v-row>
      <!-- Imagen -->
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-img
          :src="fotoGato"
          max-width="300"
          aspect-ratio="1"
          cover
          class="rounded-lg elevation-3"
        />
      </v-col>

      <!-- Información del gato -->
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <v-row dense>
                  <v-col cols="6">
                    <strong>Nombre:</strong>
                    {{ gato?.nombre }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Sexo:</strong>
                    {{ gato?.sexo }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Edad:</strong>
                    {{ gato?.edad }} años
                  </v-col>
                  <v-col cols="6">
                    <strong>Chip:</strong>
                    {{ gato?.chip }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Fecha captura:</strong>
                    {{ gato?.fecha_captura }}
                  </v-col>
                  <v-col v-if="gato?.fecha_retorno" cols="6">
                    <strong>Fecha retorno:</strong>
                    {{ gato.fecha_retorno }}
                  </v-col>
                  <v-col v-if="gato?.fecha_fallecimiento" cols="12">
                    <strong>Fecha fallecimiento:</strong>
                    {{ gato.fecha_fallecimiento }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="mt-4">
            <v-card>
              <v-card-title>Colonia</v-card-title>
              <v-card-text>
                <p>
                  <strong>Nombre:</strong>
                  {{ gato?.colonia.nombre }}
                </p>
                <p>
                  <strong>Cuidador:</strong>
                  {{ gato?.colonia.cuidador.nombre }} {{ gato?.colonia.cuidador.apellidos }}
                </p>
                <p>
                  <strong>Gatos en la colonia:</strong>
                  {{ gato?.colonia.numero_gatos }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="mt-4">
            <v-card class="pb-5">
              <v-card-title>Veterinario</v-card-title>
              <v-card-text>
                <p>
                  <strong>Nombre:</strong>
                  {{ gato?.veterinario.nombre }} {{ gato?.veterinario.apellidos }}
                </p>
                <p>
                  <strong>Contacto:</strong>
                  {{ gato?.veterinario.contacto }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="gato?.adopcion" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Adopción</v-card-title>
          <v-card-text>
            <p>
              <strong>Fecha:</strong>
              {{ gato.adopcion.fecha }}
            </p>
            <p>
              <strong>Cuidador adoptante:</strong>
              {{ gato.adopcion.cuidador.nombre }} {{ gato.adopcion.cuidador.apellidos }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="10"><span>📁 Documentos anexos</span></v-col>
              <v-col cols="2">
                <v-btn
                  color="primary"
                  prepend-icon="mdi-plus"
                  size="small"
                  @click="dialogNuevoDocumento = true"
                >
                  Añadir documento
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="doc in gato?.documentos"
                :key="doc.id"
                :href="doc.url"
                target="_blank"
              >
                <v-row>
                  <v-col cols="auto" class="d-flex align-center">
                    <v-icon color="red">mdi-file-pdf-box</v-icon>
                  </v-col>
                  <v-col cols="8">
                    <v-list-item-title>{{ doc.nombre }}</v-list-item-title>
                    <v-list-item-subtitle>{{ doc.nombre }}</v-list-item-subtitle>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      icon
                      variant="text"
                      :href="doc.url"
                      target="_blank"
                      color="primary"
                      title="Ver documento"
                    >
                      <v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialogNuevoDocumento" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h6">Nuevo documento</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="guardarDocumento">
          <v-text-field v-model="nuevoDocumento.nombre" label="Nombre del documento" required />
          <v-file-input
            v-model="nuevoDocumento.archivo"
            class="pt-4"
            variant="outlined"
            accept=".pdf"
            label="Selecciona un PDF"
            required
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dialogNuevoDocumento = false">Cancelar</v-btn>
        <v-btn color="primary" @click="guardarDocumento">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { gatos } from '@/constants/gatos'
  import type { Gato } from '@/types/gatos'

  const gato = ref<Gato>()

  // Imagen temporal de muestra
  const fotoGato = 'https://pixnio.com/free-images/2018/02/24/2018-02-24-12-51-53-1024x768.jpg'

  onMounted(() => {
    gato.value = gatos[0] // En producción: buscar por chip desde route.params.id
  })

  const dialogNuevoDocumento = ref(false)
  const nuevoDocumento = ref<{ nombre: string; archivo: File | null }>({
    nombre: '',
    archivo: null,
  })

  function guardarDocumento() {
    console.log('EEEE')
  }
</script>
