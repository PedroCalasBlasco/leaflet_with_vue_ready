<template>
  <v-row no-gutters>
    <v-col cols="6">
      <apexchart
        type="pie"
        width="70%"
        :options="esterilizacionOptions"
        :series="esterilizacionSeries"
      />
    </v-col>
    <v-col cols="6" class="d-flex justify-end">
      <apexchart type="pie" :options="esterilizacionOptions" :series="esterilizacionSeries" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useVModel } from '@vueuse/core'
  import type { Colonia } from '@/types/gatos'

  const props = defineProps<{
    colonia: Colonia
  }>()

  const emit = defineEmits<{
    (e: 'update:colonia', value: Colonia): void
  }>()

  const colonia = useVModel(props, 'colonia', emit)

  const esterilizacionSeries = computed(() => {
    if (!colonia.value || !colonia.value.gatos) return [0, 0]
    return [
      colonia.value.gatos.filter((g) => g.fecha_esterilizacion).length,
      colonia.value.gatos.filter((g) => !g.fecha_esterilizacion).length,
    ]
  })

  const esterilizacionOptions = ref({
    labels: ['Esterilizados', 'No esterilizados'],
    colors: ['#00b894', '#d63031'],
    chart: {
      type: 'pie',
    },
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  })
</script>
