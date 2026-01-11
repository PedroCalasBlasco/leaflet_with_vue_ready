<template>
  <v-data-table :headers="headers" :items="colonias" :hide-default-footer="true">
    <template #item="{ item, index }">
      <tr :class="index % 2 === 0 ? 'bg-grey-lighten-4' : ''">
        <td>{{ item.nombre }}</td>
        <td>{{ item.numero_gatos }}</td>
        <td>{{ item.cuidador.nombre }}</td>
        <td>{{ item.cuidador.contacto }}</td>
        <td>
          <v-btn icon size="small" color="primary" variant="text" @click="goToColonia(item)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon size="small" color="primary" variant="text" @click="goToEditColonia(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>

    <template #item.actions="{ item }">
      <v-btn icon size="small" color="primary" variant="text" @click="goToColonia(item)">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <v-btn icon size="small" color="primary" variant="text" @click="goToEditColonia(item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { colonias } from '@/constants/colonias'
  import type { Colonia } from '@/types/gatos'
  import router from '@/router'

  const headers = ref([
    { title: 'Nombre', key: 'nombre' },
    { title: 'Nº de Gatos', key: 'numero_gatos' },
    { title: 'Cuidador', key: 'cuidador.nombre' },
    { title: 'Contacto', key: 'cuidador.contacto' },

    {
      title: 'Acciones',
      key: 'actions',
      sortable: false,
    },
  ])

  function goToColonia(item: Colonia) {
    router.push({ name: 'colonia', params: { id: item.id } })
  }

  function goToEditColonia(item: Colonia) {
    router.push({ name: 'editarcolonia', params: { id: item.id } })
  }
</script>
