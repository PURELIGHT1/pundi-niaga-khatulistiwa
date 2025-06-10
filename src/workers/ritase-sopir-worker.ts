import { Pendapatan } from '@/models/pendapatan-model'
import { RitaseChartType, RitaseSopirType } from '@/models/ritase-model'
import { Sopir } from '@/models/sopir-model'
import i18n from '@/plugins/i18n'
import { calculateSum, getChartOptions } from '@/stores/ritase-store'

function calculateSopirs(
  pendapatans: Pendapatan[],
  sopir: Sopir,
  inputYear: number,
  inputMonth: number | null,
) {
  return pendapatans.reduce(
    (accumulator, pendapatan) => {
      const date = new Date(pendapatan.tanggal_bongkar)

      if (
        date.getFullYear() === inputYear &&
        (inputMonth === null || date.getMonth() === inputMonth) &&
        pendapatan.id_sopir === sopir.id
      ) {
        accumulator.jumlah_pendapatan += Math.round(pendapatan.pendapatan_bruto)
        accumulator.jumlah_pengiriman++
      }

      return accumulator
    },
    { jumlah_pendapatan: 0, jumlah_pengiriman: 0 },
  )
}

function getData(
  pendapatans: Pendapatan[],
  sopirs: Sopir[],
  inputSopir: RitaseSopirType,
  inputYear: number | null,
  inputMonth: number | null,
  chartType: ApexChart['type'],
) {
  const categories = sopirs.map((sopir) => sopir.nama_lengkap)
  const resultSopirs = sopirs.map((sopir) => {
    if (inputYear) {
      return calculateSopirs(pendapatans, sopir, inputYear, inputMonth)
    }

    return {
      jumlah_pendapatan: sopir.jumlah_pendapatan,
      jumlah_pengiriman: sopir.jumlah_pengiriman,
    }
  })

  let data
  let numberFormatStyle = 'currency' as keyof Intl.NumberFormatOptionsStyleRegistry

  if (inputSopir === RitaseSopirType.JumlahPendapatan) {
    data = resultSopirs.map((sopir) => sopir.jumlah_pendapatan)
  } else if (inputSopir === RitaseSopirType.JumlahPengiriman) {
    data = resultSopirs.map((sopir) => sopir.jumlah_pengiriman)
    numberFormatStyle = 'decimal'
  } else {
    data = sopirs.map((sopir) => sopir.uang_minyak)
  }

  const options = getChartOptions(
    'sopir',
    inputSopir,
    `Total: ${i18n.global.n(calculateSum(data), numberFormatStyle, 'id')}`,
    data,
    categories,
    chartType,
  )

  return { options, numberFormatStyle }
}

self.onmessage = function (event) {
  const pendapatans: Pendapatan[] = JSON.parse(event.data.pendapatans)
  const sopirs: Sopir[] = JSON.parse(event.data.sopirs)
  const inputSopir: RitaseSopirType = event.data.inputSopir
  const inputYear: number | null = event.data.inputYear
  const inputMonth: number | null = event.data.inputMonth
  const chartType: RitaseChartType = event.data.chartType

  const data = getData(
    pendapatans,
    sopirs,
    inputSopir,
    inputYear,
    inputMonth,
    chartType === RitaseChartType.Line
      ? 'line'
      : chartType === RitaseChartType.Bar
        ? 'bar'
        : 'area',
  )

  self.postMessage({
    options: JSON.stringify(data.options),
    numberFormatStyle: data.numberFormatStyle,
  })
}
