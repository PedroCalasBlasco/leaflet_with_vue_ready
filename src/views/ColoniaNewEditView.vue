<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="12">
        <h4 class="text-h5 font-weight-bold">
          {{ isEditMode ? 'Editar Colonia' : 'Nueva Colonia' }}
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const isEditMode = ref(false)
</script>
