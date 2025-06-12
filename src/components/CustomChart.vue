<template>
  <div :id="`chart${options.chart?.id}`" />
</template>

<script setup lang="ts">
import { TRANSITION_DURATION } from '@/models/app-model'
import i18n from '@/plugins/i18n'
import { delay } from '@/utils/util'
import ApexCharts, { type ApexOptions } from 'apexcharts'
import { nextTick, onMounted, onUnmounted, type PropType, ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Object as PropType<ApexOptions>,
    required: true,
  },
  numberFormatStyle: {
    type: String as PropType<keyof Intl.NumberFormatOptionsStyleRegistry>,
    default: 'currency',
  },
})

const chart = ref<ApexCharts | null>(null)

const renderChart = () => {
  if (chart.value) {
    chart.value.destroy()
  }

  chart.value = new ApexCharts(document.getElementById(`chart${props.options.chart?.id}`), {
    ...props.options,
    tooltip: {
      enabled: props.options?.tooltip?.enabled,
      y: {
        formatter(value) {
          return i18n.global.n(value, props.numberFormatStyle, 'id')
        },
      },
    },
    yaxis: {
      labels: {
        formatter(value) {
          return i18n.global.n(value, props.numberFormatStyle, 'id')
        },
      },
    },
    dataLabels: {
      enabled: props.options?.dataLabels?.enabled,
      formatter(value) {
        return i18n.global.n(Number(value), props.numberFormatStyle, 'id')
      },
    },
  } as ApexOptions)

  delay(TRANSITION_DURATION / 3).then(() => {
    nextTick(() => {
      if (chart.value) {
        chart.value.render()
      }
    })
  })
}

onMounted(() => {
  nextTick(() => {
    renderChart()
  })
})

onUnmounted(() => {
  if (chart.value) {
    chart.value.destroy()
  }
})

watch(
  () => props.options,
  () => {
    nextTick(() => {
      renderChart()
    })
  },
)
</script>
