/* eslint-disable @typescript-eslint/no-explicit-any */

import { MIN_YEAR } from '@/models/app-model'
import { type Pendapatan } from '@/models/pendapatan-model'
import { type Pengeluaran } from '@/models/pengeluaran-model'
import { RitaseType } from '@/models/ritase-model'
import i18n from '@/plugins/i18n'
import { type ApexOptions } from 'apexcharts'

function initYearlyObject() {
  const object: { [key: string]: number } = {}
  const startDate = new Date(MIN_YEAR, 0, 1)
  const endDate = new Date()
  endDate.setHours(0, 0, 0, 0)

  while (startDate.getTime() <= endDate.getTime()) {
    const type = startDate.toLocaleDateString('id', {
      year: 'numeric',
    })

    object[type] = 0
    startDate.setFullYear(startDate.getFullYear() + 1)
  }

  return object
}

function initMonthlyObject(inputYear: number) {
  const object: { [key: string]: number } = {}
  const startDate = new Date(inputYear, 0, 1)
  const endDate = new Date(startDate)
  endDate.setFullYear(startDate.getFullYear() + 1, -1, 1)

  while (startDate.getTime() <= endDate.getTime()) {
    const type = startDate.toLocaleDateString('id', {
      year: 'numeric',
      month: 'long',
    })

    object[type] = 0
    startDate.setMonth(startDate.getMonth() + 1)
  }

  return object
}

function initDailyObject(inputYear: number, inputMonth: number) {
  const object: { [key: string]: number } = {}
  const startDate = new Date(inputYear, inputMonth, 1)
  const endDate = new Date(startDate)
  endDate.setMonth(startDate.getMonth() + 1, 0)

  while (startDate.getTime() <= endDate.getTime()) {
    const type = startDate.toLocaleDateString('id', {
      dateStyle: 'full',
    })

    object[type] = 0
    startDate.setDate(startDate.getDate() + 1)
  }

  return object
}

//~1~PENDAPATAN
function getYearlyPendapatans(pendapatans: Pendapatan[]) {
  const object = initYearlyObject()

  pendapatans.forEach((pendapatan) => {
    const pendapatanDate = new Date(pendapatan.tanggal_bongkar)
    const type = pendapatanDate.toLocaleDateString('id', {
      year: 'numeric',
    })

    if (object[type] !== undefined) {
      object[type] += Math.round(pendapatan.pendapatan_bruto)
    }
  })

  return object
}

function getMonthlyPendapatans(pendapatans: Pendapatan[], inputYear: number) {
  if (inputYear) {
    const object = initMonthlyObject(inputYear)

    pendapatans.forEach((pendapatan) => {
      const pendapatanDate = new Date(pendapatan.tanggal_bongkar)
      const type = pendapatanDate.toLocaleDateString('id', {
        year: 'numeric',
        month: 'long',
      })

      if (object[type] !== undefined) {
        object[type] += Math.round(pendapatan.pendapatan_bruto)
      }
    })

    return object
  }

  return null
}

function getDailyPendapatans(pendapatans: Pendapatan[], inputYear: number, inputMonth: number) {
  if (inputYear && inputMonth !== null) {
    const object = initDailyObject(inputYear, inputMonth)

    pendapatans.forEach((pendapatan) => {
      const pendapatanDate = new Date(pendapatan.tanggal_bongkar)
      const type = pendapatanDate.toLocaleDateString('id', {
        dateStyle: 'full',
      })

      if (object[type] !== undefined) {
        object[type] += Math.round(pendapatan.pendapatan_bruto)
      }
    })

    return object
  }

  return null
}

function getSumYearlyPendapatans(pendapatans: Pendapatan[]): number {
  const values = Object.values(getYearlyPendapatans(pendapatans))
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getSumMonthlyPendapatans(pendapatans: Pendapatan[], inputYear: number): number {
  const values = Object.values(getMonthlyPendapatans(pendapatans, inputYear) || [0])
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getSumDailyPendapatans(
  pendapatans: Pendapatan[],
  inputYear: number,
  inputMonth: number,
): number {
  const values = Object.values(getDailyPendapatans(pendapatans, inputYear, inputMonth) || [0])
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

//~1~PENGELUARAN
function getYearlyPengeluarans(pengeluarans: Pengeluaran[]) {
  const object = initYearlyObject()

  pengeluarans.forEach((pengeluaran) => {
    const pengeluaranDate = new Date(pengeluaran.tanggal)
    const type = pengeluaranDate.toLocaleDateString('id', {
      year: 'numeric',
    })

    if (object[type] !== undefined) {
      object[type] += Math.round(pengeluaran.biaya)
    }
  })

  return object
}

function getMonthlyPengeluarans(pengeluarans: Pengeluaran[], inputYear: number) {
  if (inputYear) {
    const object = initMonthlyObject(inputYear)

    pengeluarans.forEach((pengeluaran) => {
      const pengeluaranDate = new Date(pengeluaran.tanggal)
      const type = pengeluaranDate.toLocaleDateString('id', {
        year: 'numeric',
        month: 'long',
      })

      if (object[type] !== undefined) {
        object[type] += Math.round(pengeluaran.biaya)
      }
    })

    return object
  }

  return null
}

function getDailyPengeluarans(pengeluarans: Pengeluaran[], inputYear: number, inputMonth: number) {
  if (inputYear && inputMonth !== null) {
    const object = initDailyObject(inputYear, inputMonth)

    pengeluarans.forEach((pengeluaran) => {
      const pengeluaranDate = new Date(pengeluaran.tanggal)
      const type = pengeluaranDate.toLocaleDateString('id', {
        dateStyle: 'full',
      })

      if (object[type] !== undefined) {
        object[type] += Math.round(pengeluaran.biaya)
      }
    })

    return object
  }

  return null
}

function getSumYearlyPengeluarans(pengeluarans: Pengeluaran[]): number {
  const values = Object.values(getYearlyPengeluarans(pengeluarans))
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getSumMonthlyPengeluarans(pengeluarans: Pengeluaran[], inputYear: number): number {
  const values = Object.values(getMonthlyPengeluarans(pengeluarans, inputYear) || [0])
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getSumDailyPengeluarans(
  pengeluarans: Pengeluaran[],
  inputYear: number,
  inputMonth: number,
): number {
  const values = Object.values(getDailyPengeluarans(pengeluarans, inputYear, inputMonth) || [0])
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

//~1~KEUNTUNGAN
function getYearlyKeuntungans(pendapatans: Pendapatan[], pengeluarans: Pengeluaran[]) {
  const yearlyPendapatans = getYearlyPendapatans(pendapatans)
  const yearlyPengeluarans = getYearlyPengeluarans(pengeluarans)

  const object: { [key: string]: number } = {}

  for (const year in yearlyPendapatans) {
    if (yearlyPengeluarans.hasOwnProperty(year)) {
      object[year] = yearlyPendapatans[year] - yearlyPengeluarans[year]
    }
  }

  return object
}

function getMonthlyKeuntungans(
  pendapatans: Pendapatan[],
  pengeluarans: Pengeluaran[],
  inputYear: number,
) {
  const monthlyPendapatans = getMonthlyPendapatans(pendapatans, inputYear)
  const monthlyPengeluarans = getMonthlyPengeluarans(pengeluarans, inputYear)

  if (monthlyPendapatans && monthlyPengeluarans) {
    const object: { [key: string]: number } = {}

    for (const month in monthlyPendapatans) {
      if (monthlyPengeluarans.hasOwnProperty(month)) {
        object[month] = monthlyPendapatans[month] - monthlyPengeluarans[month]
      }
    }

    return object
  }

  return null
}

function getDailyKeuntungans(
  pendapatans: Pendapatan[],
  pengeluarans: Pengeluaran[],
  inputYear: number,
  inputMonth: number,
) {
  const dailyPendapatans = getDailyPendapatans(pendapatans, inputYear, inputMonth)
  const dailyPengeluarans = getDailyPengeluarans(pengeluarans, inputYear, inputMonth)

  if (dailyPendapatans && dailyPengeluarans) {
    const object: { [key: string]: number } = {}

    for (const daily in dailyPendapatans) {
      if (dailyPengeluarans.hasOwnProperty(daily)) {
        object[daily] = dailyPendapatans[daily] - dailyPengeluarans[daily]
      }
    }

    return object
  }

  return null
}

function getSumYearlyKeuntungans(pendapatans: Pendapatan[], pengeluarans: Pengeluaran[]): number {
  const values = Object.values(getYearlyKeuntungans(pendapatans, pengeluarans))
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getSumMonthlyKeuntungans(
  pendapatans: Pendapatan[],
  pengeluarans: Pengeluaran[],
  inputYear: number,
): number {
  const values = Object.values(getMonthlyKeuntungans(pendapatans, pengeluarans, inputYear) || [0])
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getSumDailyKeuntungans(
  pendapatans: Pendapatan[],
  pengeluarans: Pengeluaran[],
  inputYear: number,
  inputMonth: number,
): number {
  const values = Object.values(
    getDailyKeuntungans(pendapatans, pengeluarans, inputYear, inputMonth) || [0],
  )
  return values.reduce((accumulator, value) => accumulator + value, 0)
}

function getOptions(title: string, subtitle: string, data: number[], categories: any): ApexOptions {
  return {
    chart: {
      id: title.replace(/ /g, '-'),
      group: 'sparklines',
      type: 'area',
      width: '100%',
      height: '240px',
      sparkline: {
        enabled: true,
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
    },
    tooltip: {
      enabled: true,
    },
    colors: ['#1B5E20'],
  }
}

function getData(
  _pendapatans: Pendapatan[],
  _pengeluarans: Pengeluaran[],
  inputYear: number | null,
  inputMonth: number | null,
) {
  let type = RitaseType.Yearly
  let pendapatans = getYearlyPendapatans(_pendapatans)
  let sumPendapatan = getSumYearlyPendapatans(_pendapatans)
  let pengeluarans = getYearlyPengeluarans(_pengeluarans)
  let sumPengeluaran = getSumYearlyPengeluarans(_pengeluarans)
  let keuntungans = getYearlyKeuntungans(_pendapatans, _pengeluarans)
  let sumKeuntungan = getSumYearlyKeuntungans(_pendapatans, _pengeluarans)

  if (inputYear && inputMonth !== null) {
    type = RitaseType.Daily
    const dailyPendapatans = getDailyPendapatans(_pendapatans, inputYear, inputMonth)
    const dailyPengeluarans = getDailyPengeluarans(_pengeluarans, inputYear, inputMonth)
    const dailyKeuntungans = getDailyKeuntungans(_pendapatans, _pengeluarans, inputYear, inputMonth)

    if (dailyPendapatans) {
      pendapatans = dailyPendapatans
      sumPendapatan = getSumDailyPendapatans(_pendapatans, inputYear, inputMonth)
    }

    if (dailyPengeluarans) {
      pengeluarans = dailyPengeluarans
      sumPengeluaran = getSumDailyPengeluarans(_pengeluarans, inputYear, inputMonth)
    }

    if (dailyKeuntungans) {
      keuntungans = dailyKeuntungans
      sumKeuntungan = getSumDailyKeuntungans(_pendapatans, _pengeluarans, inputYear, inputMonth)
    }
  } else if (inputYear) {
    type = RitaseType.Monthly
    const monthlyPendapatans = getMonthlyPendapatans(_pendapatans, inputYear)
    const monthlyPengeluarans = getMonthlyPengeluarans(_pengeluarans, inputYear)
    const monthlyKeuntungans = getMonthlyKeuntungans(_pendapatans, _pengeluarans, inputYear)

    if (monthlyPendapatans) {
      pendapatans = monthlyPendapatans
      sumPendapatan = getSumMonthlyPendapatans(_pendapatans, inputYear)
    }

    if (monthlyPengeluarans) {
      pengeluarans = monthlyPengeluarans
      sumPengeluaran = getSumMonthlyPengeluarans(_pengeluarans, inputYear)
    }

    if (monthlyKeuntungans) {
      keuntungans = monthlyKeuntungans
      sumKeuntungan = getSumMonthlyKeuntungans(_pendapatans, _pengeluarans, inputYear)
    }
  }

  const pendapatanOptions = getOptions(
    `Pendapatan ${type}`,
    `Total: ${i18n.global.n(sumPendapatan, 'currency', 'id')}`,
    Object.values(pendapatans),
    Object.keys(pendapatans),
  )

  const pengeluaranOptions = getOptions(
    `Pengeluaran ${type}`,
    `Total: ${i18n.global.n(sumPengeluaran, 'currency', 'id')}`,
    Object.values(pengeluarans),
    Object.keys(pengeluarans),
  )

  const keuntunganOptions = getOptions(
    `Keuntungan ${type}`,
    `Total: ${i18n.global.n(sumKeuntungan, 'currency', 'id')}`,
    Object.values(keuntungans),
    Object.keys(keuntungans),
  )

  return { pendapatanOptions, pengeluaranOptions, keuntunganOptions }
}

self.onmessage = function (event) {
  const pendapatans: Pendapatan[] = JSON.parse(event.data.pendapatans)
  const pengeluarans: Pengeluaran[] = JSON.parse(event.data.pengeluarans)
  const inputYear: number | null = event.data.inputYear
  const inputMonth: number | null = event.data.inputMonth

  const data = getData(pendapatans, pengeluarans, inputYear, inputMonth)

  self.postMessage({
    pendapatanOptions: JSON.stringify(data.pendapatanOptions),
    pengeluaranOptions: JSON.stringify(data.pengeluaranOptions),
    keuntunganOptions: JSON.stringify(data.keuntunganOptions),
  })
}
