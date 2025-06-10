import type { FormattedMobil, Mobil, MobilJenisBBM, MobilWarna } from '@/models/mobil-model'
import i18n from '@/plugins/i18n'
import { randomNumber } from '@/utils/util'

export function getFormattedMobils(mobils: Mobil[]): FormattedMobil[] {
  return mobils.map((mobil, index) => {
    const harga = `${i18n.global.n(mobil.harga, 'currency', 'id')}`
    const biaya_pajak = `${i18n.global.n(mobil.biaya_pajak, 'currency', 'id')}`
    const jatuh_tempo_pajak = new Date(mobil.jatuh_tempo_pajak).toLocaleDateString('id', {
      dateStyle: 'full',
    })
    const jumlah_pendapatan = `${i18n.global.n(mobil.jumlah_pendapatan, 'currency', 'id')}`
    const jumlah_pengeluaran = `${i18n.global.n(mobil.jumlah_pengeluaran, 'currency', 'id')}`
    const jumlah_penggunaan = `${i18n.global.n(mobil.jumlah_penggunaan, 'decimal', 'id')}`

    return {
      id: mobil.id,
      nomor: index + 1,
      merek: mobil.merek,
      jenis: mobil.jenis,
      nomor_polisi: mobil.nomor_polisi,
      nama: mobil.nama,
      jenis_bbm: mobil.jenis_bbm,
      warna: mobil.warna,
      harga: harga,
      biaya_pajak: biaya_pajak,
      jatuh_tempo_pajak: jatuh_tempo_pajak,
      jumlah_pendapatan: jumlah_pendapatan,
      jumlah_pengeluaran: jumlah_pengeluaran,
      jumlah_penggunaan: jumlah_penggunaan,
      status_bayar_pajak: mobil.status_bayar_pajak,
      status_pajak: mobil.status_pajak,
      send_notif: mobil.send_notif,
    }
  })
}

export function initializeMobils(): Mobil[] {
  return [
    {
      id: 1,
      merek: 'Mitsubishi',
      jenis: 'Pickup',
      nomor_polisi: 'KB 2384 Q',
      nama: 'L300',
      jenis_bbm: MobilJenisBBM.Pertalite,
      warna: MobilWarna[randomNumber(0, MobilWarna.length - 1)].value,
      harga: 217000000,
      biaya_pajak: 4340000,
      jatuh_tempo_pajak: new Date(2026, 2, 15),
      jumlah_pendapatan: 0,
      jumlah_pengeluaran: 0,
      jumlah_penggunaan: 0,
      status_bayar_pajak: true,
      status_pajak: null,
      send_notif: false,
    },
    {
      id: 2,
      merek: 'Mitsubishi',
      jenis: 'Truck',
      nomor_polisi: 'KB 4123 MN',
      nama: 'Colt Diesel FE 74 HD',
      jenis_bbm: MobilJenisBBM.Solar,
      warna: MobilWarna[randomNumber(0, MobilWarna.length - 1)].value,
      harga: 340000000,
      biaya_pajak: 6800000,
      jatuh_tempo_pajak: new Date(2028, 4, 27),
      jumlah_pendapatan: 0,
      jumlah_pengeluaran: 0,
      jumlah_penggunaan: 0,
      status_bayar_pajak: true,
      status_pajak: null,
      send_notif: false,
    },
    {
      id: 3,
      merek: 'Mitsubishi',
      jenis: 'Truck',
      nomor_polisi: 'KB 7546 R',
      nama: 'Colt Diesel FE SHD-X 6.666',
      jenis_bbm: MobilJenisBBM.Solar,
      warna: MobilWarna[randomNumber(0, MobilWarna.length - 1)].value,
      harga: 365000000,
      biaya_pajak: 7300000,
      jatuh_tempo_pajak: new Date(2027, 7, 9),
      jumlah_pendapatan: 0,
      jumlah_pengeluaran: 0,
      jumlah_penggunaan: 0,
      status_bayar_pajak: true,
      status_pajak: null,
      send_notif: false,
    },
    {
      id: 4,
      merek: 'Mitsubishi',
      jenis: 'Truck',
      nomor_polisi: 'KB 189 HJK',
      nama: 'Fuso FM 517 HS',
      jenis_bbm: MobilJenisBBM.Solar,
      warna: MobilWarna[randomNumber(0, MobilWarna.length - 1)].value,
      harga: 460000000,
      biaya_pajak: 9200000,
      jatuh_tempo_pajak: new Date(2029, 10, 18),
      jumlah_pendapatan: 0,
      jumlah_pengeluaran: 0,
      jumlah_penggunaan: 0,
      status_bayar_pajak: true,
      status_pajak: null,
      send_notif: false,
    },
    {
      id: 5,
      merek: 'Mitsubishi',
      jenis: 'Truck',
      nomor_polisi: 'KB 2072 BL',
      nama: 'Fuso FM 517 HL Long',
      jenis_bbm: MobilJenisBBM.Solar,
      warna: MobilWarna[randomNumber(0, MobilWarna.length - 1)].value,
      harga: 510000000,
      biaya_pajak: 10200000,
      jatuh_tempo_pajak: new Date(2025, 5, 9),
      jumlah_pendapatan: 0,
      jumlah_pengeluaran: 0,
      jumlah_penggunaan: 0,
      status_bayar_pajak: false,
      status_pajak: null,
      send_notif: false,
    },
  ]
}
