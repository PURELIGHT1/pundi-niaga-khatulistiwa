import { FormattedPendapatan, Pendapatan } from '@/models/pendapatan-model'
import { Sopir } from '@/models/sopir-model'
import i18n from '@/plugins/i18n'
import { useSopirStore } from '../sopir-store'
import { useMobilStore } from '../mobil-store'
import { Mobil } from '@/models/mobil-model'
import { MIN_YEAR } from '@/models/app-model'
import { randomNumber } from '@/utils/util'
import { useAppStore } from '../app-store'
import { UserJenis } from '../../models/user-model'

export function getFormattedPendapatans(pendapatans: Pendapatan[]): FormattedPendapatan[] {
  const sopirStore = useSopirStore()
  const mobilStore = useMobilStore()
  const appStore = useAppStore()

  return pendapatans
    .filter((pendapatan) => pendapatan.is_active)
    .filter((pendapatan) =>
      appStore.user.jenis !== UserJenis.Pemilik ? pendapatan.butuh_konfirmasi === false : true,
    )
    .map((pendapatan, index) => {
      const sopir = sopirStore.sopirs.find((sopir) => sopir.id === pendapatan.id_sopir) as Sopir

      const mobil = mobilStore.mobils.find((mobil) => mobil.id === pendapatan.id_mobil) as Mobil

      const tanggal_muat = new Date(pendapatan.tanggal_muat).toLocaleDateString('id', {
        dateStyle: 'full',
      })
      const tanggal_bongkar = new Date(pendapatan.tanggal_bongkar).toLocaleDateString('id', {
        dateStyle: 'full',
      })
      const timbangan_muat = `${i18n.global.n(pendapatan.timbangan_muat, 'decimal', 'id')}`
      const timbangan_bongkar = `${i18n.global.n(pendapatan.timbangan_bongkar, 'decimal', 'id')}`
      const selisih_berat = `${i18n.global.n(pendapatan.selisih_berat, 'decimal', 'id')}`
      const persen_susut = `${i18n.global.n(pendapatan.persen_susut, 'decimal', 'id')}%`
      const ongkos_angkut = `${i18n.global.n(pendapatan.ongkos_angkut, 'currency', 'id')}/Kg`
      const harga_klaim_susut = `${i18n.global.n(pendapatan.harga_klaim_susut, 'currency', 'id')}`
      const sub_total = `${i18n.global.n(pendapatan.sub_total, 'currency', 'id')}`
      const ppn = `${i18n.global.n(pendapatan.ppn, 'currency', 'id')}`
      const pph = `${i18n.global.n(pendapatan.pph, 'currency', 'id')}`
      const klaim_susut = `${i18n.global.n(pendapatan.klaim_susut, 'currency', 'id')}`
      const pendapatan_bruto = `${i18n.global.n(pendapatan.pendapatan_bruto, 'currency', 'id')}`

      return {
        id: pendapatan.id,
        nomor: index + 1,
        id_sopir: pendapatan.id_sopir,
        id_mobil: pendapatan.id_mobil,
        sopir: `${sopir.nama_lengkap}\n${sopir.nomor_hp}`,
        mobil: `${mobil.nomor_polisi}\n${mobil.nama}`,
        spk: pendapatan.spk,
        tanggal_muat: tanggal_muat,
        tanggal_bongkar: tanggal_bongkar,
        timbangan_muat: timbangan_muat,
        timbangan_bongkar: timbangan_bongkar,
        selisih_berat: selisih_berat,
        persen_susut: persen_susut,
        ongkos_angkut: ongkos_angkut,
        harga_klaim_susut: harga_klaim_susut,
        sub_total: sub_total,
        ppn: ppn,
        pph: pph,
        klaim_susut: klaim_susut,
        pendapatan_bruto: pendapatan_bruto,
        is_active: pendapatan.is_active,
        butuh_konfirmasi: pendapatan.butuh_konfirmasi,
      }
    })
}

export function initializePendapatans(): Pendapatan[] {
  const sopirStore = useSopirStore()
  const mobilStore = useMobilStore()
  const startDate = new Date(MIN_YEAR, 0, 1)
  const endDate = new Date()

  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)

  const pendapatans: Pendapatan[] = []

  while (startDate.getTime() <= endDate.getTime()) {
    if (pendapatans.length > 9) {
      break
    }
    const sopir: Sopir = sopirStore.sopirs[randomNumber(0, sopirStore.sopirs.length - 1)]
    const mobil: Mobil = mobilStore.mobils[randomNumber(0, mobilStore.mobils.length - 1)]
    const spk = `PNK/${startDate.getTime()}/${startDate.toLocaleDateString('id', { dateStyle: 'short' })}`
    const tanggal_muat = new Date(
      randomNumber(MIN_YEAR, startDate.getFullYear()),
      randomNumber(0, startDate.getMonth()),
      randomNumber(1, startDate.getDate()),
    )
    const tanggal_bongkar = new Date(
      randomNumber(tanggal_muat.getFullYear(), startDate.getFullYear()),
      randomNumber(tanggal_muat.getMonth(), startDate.getMonth()),
      randomNumber(tanggal_muat.getDate(), startDate.getDate()),
    )
    const timbangan_muat = randomNumber(10, 10000)
    const timbangan_bongkar = randomNumber(10, 10000)
    const ongkos_angkut = randomNumber(1, 1000)
    const harga_klaim_susut = randomNumber(1000, 100000)
    const selisih_berat = timbangan_bongkar - timbangan_muat
    const persen_susut = selisih_berat / timbangan_muat
    const sub_total = Math.floor(ongkos_angkut * timbangan_bongkar)
    const ppn = Math.floor((sub_total * 11) / 100)
    const pph = Math.floor((sub_total * 2) / 100)
    const klaim_susut = Math.floor(harga_klaim_susut * selisih_berat)
    const pendapatan_bruto = Math.floor(sub_total + ppn - (pph + klaim_susut))

    pendapatans.push({
      id: pendapatans.length === 0 ? 1 : pendapatans[pendapatans.length - 1].id + 1,
      id_sopir: sopir.id,
      id_mobil: mobil.id,
      spk: spk,
      tanggal_muat: tanggal_muat,
      tanggal_bongkar: tanggal_bongkar,
      timbangan_muat: timbangan_muat,
      timbangan_bongkar: timbangan_bongkar,
      selisih_berat: selisih_berat,
      persen_susut: persen_susut,
      ongkos_angkut: ongkos_angkut,
      harga_klaim_susut: harga_klaim_susut,
      sub_total: sub_total,
      ppn: ppn,
      pph: pph,
      klaim_susut: klaim_susut,
      pendapatan_bruto: pendapatan_bruto,
      is_active: true,
      butuh_konfirmasi: false,
    })

    startDate.setDate(startDate.getDate() + 1)
  }

  return pendapatans
}
