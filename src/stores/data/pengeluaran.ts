import i18n from '@/plugins/i18n'
import { MIN_YEAR } from '@/models/app-model'
import { randomNumber } from '@/utils/util'
import { type FormattedPengeluaran, type Pengeluaran, PengeluaranType } from '@/models/pengeluaran-model'
import { useMobilStore } from '../mobil-store'

export function getFormattedPengeluarans(pengeluarans: Pengeluaran[]): FormattedPengeluaran[] {
  const mobilStore = useMobilStore()
  return pengeluarans
    .filter((pendapatan) => pendapatan.is_active)
    .map((pengeluaran, index) => {
      const biaya = `${i18n.global.n(pengeluaran.biaya, 'currency', 'id')}`
      const tanggal = new Date(pengeluaran.tanggal).toLocaleDateString('id', {
        dateStyle: 'full',
      })
      const tipe =
        typeof pengeluaran.tipe === 'string' ? pengeluaran.tipe : PengeluaranType[pengeluaran.tipe]

      let mobil = null
      if (pengeluaran.tipe === PengeluaranType.Mobil && pengeluaran.id_mobil) {
        mobil = mobilStore.mobils.find((mobil) => mobil.id === Number(pengeluaran.id_mobil))
      }

      return {
        id: pengeluaran.id,
        id_mobil: pengeluaran.id_mobil ? Number(pengeluaran.id_mobil) : 0,
        mobil: mobil ? `${mobil.nomor_polisi} - ${mobil.nama}` : '-',
        nomor: index + 1,
        tipe: tipe,
        keterangan: pengeluaran.keterangan,
        biaya: biaya,
        tanggal: tanggal,
        is_active: pengeluaran.is_active,
      }
    })
}

export function initializePengeluarans(): Pengeluaran[] {
  const startDate = new Date(MIN_YEAR, 0, 1)
  const endDate = new Date()

  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)

  const pengeluarans: Pengeluaran[] = []
  const mobilStore = useMobilStore()

  while (startDate.getTime() <= endDate.getTime()) {
    let mobil = null
    const biaya = randomNumber(10000, 10000000)
    const tanggal = new Date(
      randomNumber(MIN_YEAR, startDate.getFullYear()),
      randomNumber(0, startDate.getMonth()),
      randomNumber(1, startDate.getDate()),
    )
    const values = Object.values(PengeluaranType)
    const tipe = values[randomNumber(0, values.length - 1)] as PengeluaranType
    if (tipe === PengeluaranType.Mobil) {
      mobil = mobilStore.mobils[randomNumber(0, mobilStore.mobils.length - 1)]
    }
    const keterangan = `Pengeluaran pada hari ${tanggal.toLocaleDateString('id', { dateStyle: 'full' })} sebesar Rp ${i18n.global.n(biaya, 'currency', 'id')}`

    pengeluarans.push({
      id: pengeluarans.length === 0 ? 1 : pengeluarans[pengeluarans.length - 1].id + 1,
      id_mobil: mobil ? mobil.id.toString() : null,
      tipe: tipe,
      keterangan: keterangan,
      biaya: biaya,
      tanggal: tanggal,
      is_active: true,
    })

    startDate.setDate(startDate.getDate() + 1)
  }

  return pengeluarans
}
