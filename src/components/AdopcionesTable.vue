<template>
  <v-data-table
    v-model:page="page"
    :headers="headers"
    :items="adopciones"
    :hide-default-footer="!props.showPagination"
    :items-per-page="props.itemsPerPage"
  >
    <template v-if="props.showFilters" #top>
      <v-row>
        <v-col cols="3">
          <v-text-field class="pa-2" label="Colonia" hide-details></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field class="pa-2" label="Colonia" hide-details></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field class="pa-2" label="Colonia" hide-details></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field class="pa-2" label="Colonia" hide-details></v-text-field>
        </v-col>
      </v-row>
    </template>

    <template #item.actions="{ item }">
      <v-btn icon size="small" color="primary" variant="text">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>

    <template v-if="props.showPagination" #bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { adopciones } from '@/constants/adopciones'

  const props = defineProps<{
    showFilters?: boolean
    showPagination?: boolean
    itemsPerPage: number
  }>()

  const page = ref(1)
  const headers = ref([
    { title: 'Fecha', key: 'fecha' },
    { title: 'Nombre del gato', key: 'gato.nombre' },
    { title: 'Sexo', key: 'gato.sexo' },
    { title: 'Edad', key: 'gato.edad' },
    { title: 'Colonia', key: 'gato.colonia.nombre' },
    { title: 'Cuidador', key: 'cuidador.nombre' },
    {
      title: 'Acciones',
      key: 'actions',
      sortable: false,
      fixed: true,
      lastFixed: true,
    },
  ])

  const pageCount = computed(() => {
    return props.showPagination ? Math.ceil(adopciones.length / props.itemsPerPage) : 1
  })
</script>
