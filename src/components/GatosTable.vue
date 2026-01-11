<template>
  <v-data-table
    v-model:page="page"
    :headers="headers"
    :items="gatos"
    :hide-default-footer="!props.showPagination"
    :items-per-page="props.itemsPerPage"
    :item-class="getRowClass"
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

    <template #item="{ item, index }">
      <tr :class="index % 2 === 0 ? 'bg-grey-lighten-4' : ''">
        <td>{{ item.nombre }}</td>
        <td>{{ item.sexo }}</td>
        <td>{{ item.edad }}</td>
        <td>{{ item.chip }}</td>
        <td>{{ item.fecha_captura }}</td>
        <td>{{ item.colonia.nombre }}</td>
        <td>{{ item.colonia.cuidador.nombre }}</td>
        <td>{{ item.veterinario.nombre }}</td>
        <td>
          <v-btn icon size="small" color="primary" variant="text" @click="goToGato(item)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon size="small" color="primary" variant="text" @click="goToEditGato(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </td>
      </tr>
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
  import { gatos } from '@/constants/gatos'
  import type { Gato } from '@/types/gatos'
  import router from '@/router'

  const props = defineProps<{
    showFilters?: boolean
    showPagination?: boolean
    itemsPerPage: number
  }>()

  const page = ref(1)
  const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Sexo', key: 'sexo' },
    { title: 'Edad', key: 'edad' },
    { title: 'Chip', key: 'chip' },
    { title: 'Fecha de Captura', key: 'fecha_captura' },
    { title: 'Colonia', key: 'colonia.nombre' },
    { title: 'Cuidador', key: 'colonia.cuidador.nombre' },
    { title: 'Veterinario', key: 'veterinario.nombre' },
    {
      title: 'Acciones',
      key: 'actions',
      sortable: false,
    },
  ]

  const itemsPerPageComputed = computed(() => (props.showPagination ? props.itemsPerPage : -1))

  const pageCount = computed(() => {
    return props.showPagination ? Math.ceil(gatos.length / props.itemsPerPage) : 1
  })

  function getRowClass(item, index: number) {
    // Alternar clase según índice (par/impar)
    return index % 2 === 0 ? 'row-colored' : ''
  }

  function goToGato(item: Gato) {
    router.push({ name: 'gato', params: { id: item.chip } })
  }

  function goToEditGato(item: Gato) {
    router.push({ name: 'editargato', params: { id: item.chip } })
  }
</script>

<style scoped>
  .row-colored {
    background-color: #f5f5f5;
  }
</style>
