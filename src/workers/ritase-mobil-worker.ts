import { type Pendapatan } from '@/models/pendapatan-model'
import { RitaseChartType, RitaseMobilType } from '@/models/ritase-model'
import { type Mobil } from '@/models/mobil-model'
import i18n from '@/plugins/i18n'
import { calculateSum, getChartOptions } from '@/stores/ritase-store'

function calculateMobils(
  pendapatans: Pendapatan[],
  mobil: Mobil,
  inputYear: number,
  inputMonth: number | null,
) {
  const objectPendapatans = pendapatans.reduce(
    (accumulator, pendapatan) => {
      const date = new Date(pendapatan.tanggal_bongkar)
      if (
        date.getFullYear() === inputYear &&
        (inputMonth === null || date.getMonth() === inputMonth) &&
        pendapatan.id_mobil === mobil.id
      ) {
        accumulator.jumlah_pendapatan += Math.round(pendapatan.pendapatan_bruto)
        accumulator.jumlah_penggunaan++
      }

      return accumulator
    },
    { jumlah_pendapatan: 0, jumlah_penggunaan: 0 },
  )

  return { ...objectPendapatans }
}

function getData(
  pendapatans: Pendapatan[],
  mobils: Mobil[],
  inputMobil: RitaseMobilType,
  inputYear: number | null,
  inputMonth: number | null,
  chartType: ApexChart['type'],
) {
  const categories = mobils.map((mobil) => mobil.nomor_polisi)
  const resultMobils = mobils.map((mobil) => {
    if (inputYear) {
      return calculateMobils(pendapatans, mobil, inputYear, inputMonth)
    }

    return {
      jumlah_pendapatan: mobil.jumlah_pendapatan,
      jumlah_penggunaan: mobil.jumlah_penggunaan,
    }
  })

  let data
  let numberFormatStyle = 'currency' as keyof Intl.NumberFormatOptionsStyleRegistry

  if (inputMobil === RitaseMobilType.JumlahPendapatan) {
    data = resultMobils.map((mobil) => mobil.jumlah_pendapatan)
  } else if (inputMobil === RitaseMobilType.JumlahPenggunaan) {
    data = resultMobils.map((mobil) => mobil.jumlah_penggunaan)
    numberFormatStyle = 'decimal'
  } else if (inputMobil === RitaseMobilType.HargaMobil) {
    data = mobils.map((mobil) => mobil.harga)
  } else {
    data = mobils.map((mobil) => mobil.biaya_pajak)
  }

  const options = getChartOptions(
    'mobil',
    inputMobil,
    `Total: ${i18n.global.n(calculateSum(data), numberFormatStyle, 'id')}`,
    data,
    categories,
    chartType,
  )

  return { options, numberFormatStyle }
}

self.onmessage = function (event) {
  const pendapatans: Pendapatan[] = JSON.parse(event.data.pendapatans)
  const mobils: Mobil[] = JSON.parse(event.data.mobils)
  const inputMobil: RitaseMobilType = event.data.inputMobil
  const inputYear: number | null = event.data.inputYear
  const inputMonth: number | null = event.data.inputMonth
  const chartType: RitaseChartType = event.data.chartType

  const data = getData(
    pendapatans,
    mobils,
    inputMobil,
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
