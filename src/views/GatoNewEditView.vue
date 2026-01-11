<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="12">
        <h4 class="text-h5 font-weight-bold">
          {{ isEditMode ? 'Editar Gato' : 'Nuevo Gato' }}
        </h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-column align-center justify-center">
        <v-img
          :key="fotoPreview || fotoGato"
          :src="fotoPreview || fotoGato"
          max-width="300"
          aspect-ratio="1"
          style="width: 100%"
          cover
          class="rounded-lg elevation-3 mb-4"
        />

        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="d-none"
          @change="handleImageUpload"
        />

        <v-btn color="primary" icon rounded @click="fileInputRef?.click()">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <v-form ref="formRef" v-model="isFormValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.nombre"
                    label="Nombre"
                    :rules="[(v) => !!v || 'Requerido']"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="form.sexo"
                    :items="['Macho', 'Hembra']"
                    label="Sexo"
                    :rules="[(v) => !!v || 'Requerido']"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="form.edad"
                    label="Edad (años)"
                    type="number"
                    :rules="[(v) => v >= 0 || 'Debe ser ≥ 0']"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.chip"
                    label="Chip"
                    :rules="[(v) => !!v || 'Requerido']"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.fecha_captura" label="Fecha Captura" type="date" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.colonia.nombre" label="Colonia" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="cancel">Cancelar</v-btn>
            <v-btn :disabled="!isFormValid" color="primary" @click="submit">
              {{ isEditMode ? 'Guardar' : 'Crear' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { gatos } from '@/constants/gatos'
  import type { Gato } from '@/types/gatos'

  const route = useRoute()
  const router = useRouter()

  const formRef = ref()
  const isFormValid = ref(false)
  const isEditMode = computed(() => !!route.params.id)

  const fotoGato = 'https://pixnio.com/free-images/2018/02/24/2018-02-24-12-51-53-1024x768.jpg'

  const fileInputRef = ref<HTMLInputElement | null>(null)
  const fotoPreview = ref<string | null>(null)

  function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        fotoPreview.value = reader.result as string
        console.log(' fotoPreview.value ', fotoPreview.value)
      }
      reader.readAsDataURL(file)
    }
  }

  const form = reactive<Partial<Gato>>({
    nombre: '',
    sexo: '',
    edad: 0,
    chip: '',
    fecha_captura: '',
    colonia: {
      nombre: '',
      id: '',
      latitud: '',
      longitud: '',
      cuidador: { id: '', nombre: '', apellidos: '', contacto: '' },
      numero_gatos: 0,
    },
    veterinario: { id: '', nombre: '', apellidos: '', contacto: '' },
  })

  onMounted(() => {
    if (isEditMode.value) {
      const gato = gatos.find((g) => g.chip === route.params.id)
      if (gato) Object.assign(form, gato)
      else router.replace({ name: 'gatos' })
    }
  })

  function cancel() {
    router.back()
  }

  function submit() {
    if (!isFormValid.value) return
    if (isEditMode.value) {
      console.log('Actualizar gato', form)
    } else {
      console.log('Crear nuevo gato', form)
    }
    router.back()
  }
</script>
