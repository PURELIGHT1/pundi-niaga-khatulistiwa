/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApexOptions } from 'apexcharts'
import { defineStore } from 'pinia'
import { RitaseChartType, RitaseMobilType, RitaseSopirType } from '@/models/ritase-model'
import { toRef } from 'vue'

export const useRitaseStore = defineStore('ritase-store', {
  state: () => ({
    pendapatanOptions: null as ApexOptions | null,
    pengeluaranOptions: null as ApexOptions | null,
    keuntunganOptions: null as ApexOptions | null,
    inputYear: new Date().getFullYear() as number | null,
    inputMonth: null as number | null,
    worker: null as Worker | null,

    sopir: {
      options: null as ApexOptions | null,
      inputSopir: RitaseSopirType.JumlahPendapatan,
      inputYear: null as number | null,
      inputMonth: null as number | null,
      chartType: RitaseChartType.Area as RitaseChartType,
      numberFormatStyle: 'currency' as keyof Intl.NumberFormatOptionsStyleRegistry,
      worker: null as Worker | null,
    },

    mobil: {
      options: null as ApexOptions | null,
      inputMobil: RitaseMobilType.JumlahPendapatan,
      inputYear: null as number | null,
      inputMonth: null as number | null,
      chartType: RitaseChartType.Area as RitaseChartType,
      numberFormatStyle: 'currency' as keyof Intl.NumberFormatOptionsStyleRegistry,
      worker: null as Worker | null,
    },
  }),

  actions: {},

  getters: {
    getSparklineItems(state) {
      return [
        {
          options: state.pendapatanOptions,
        },
        {
          options: state.pengeluaranOptions,
        },
        {
          options: state.keuntunganOptions,
        },
      ]
    },

    getChartItems(state) {
      return [
        {
          model: 'sopir' as 'sopir' | 'mobil',
          items: Object.values(RitaseSopirType),
          label: 'Laporan Sopir',
          icon: { active: '$ship-wheel', passive: '$steering' },
          options: state.sopir.options,
          inputModel: toRef(state.sopir, 'inputSopir'),
          inputYear: toRef(state.sopir, 'inputYear'),
          inputMonth: toRef(state.sopir, 'inputMonth'),
          chartType: toRef(state.sopir, 'chartType'),
          numberFormatStyle: state.sopir.numberFormatStyle,
        },
        {
          model: 'mobil' as 'mobil' | 'mobil',
          items: Object.values(RitaseMobilType),
          label: 'Laporan Mobil',
          icon: { active: '$car', passive: '$car-outline' },
          options: state.mobil.options,
          inputModel: toRef(state.mobil, 'inputMobil'),
          inputYear: toRef(state.mobil, 'inputYear'),
          inputMonth: toRef(state.mobil, 'inputMonth'),
          chartType: toRef(state.mobil, 'chartType'),
          numberFormatStyle: state.mobil.numberFormatStyle,
        },
      ]
    },
  },
})

export function calculateSum(values: number[]) {
  return values.reduce((accumulator, value) => {
    accumulator += value
    return accumulator
  }, 0)
}

export function getChartOptions(
  model: 'sopir' | 'mobil',
  title: string,
  subtitle: string,
  data: number[],
  categories: any,
  chartType: ApexChart['type'],
): ApexOptions {
  return {
    chart: {
      id: `${model}-${title.replace(/ /g, '-')}`,
      type: chartType,
      width: '100%',
      height: '480px',
      toolbar: {
        offsetX: -30,
        offsetY: 11.5,
      },
    },
    title: {
      text: title,
      offsetX: 30,
      style: {
        fontSize: '24px',
      },
    },
    subtitle: {
      text: subtitle,
      offsetX: 30,
      style: {
        fontSize: '16px',
      },
    },
    series: [
      {
        name: title,
        data: data,
      },
    ],
    xaxis: {
      categories: categories,
      tooltip: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          orientation: 'vertical',
        },
      },
    },
    dataLabels: {
      enabled: chartType === 'bar',
    },
    tooltip: {
      enabled: true,
    },
    colors: ['#1B5E20'],
  }
}
