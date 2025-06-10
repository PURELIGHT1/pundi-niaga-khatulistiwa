import { useAppStore } from '@/stores/app-store'
import {
  biayaPajakValidation,
  hargaValidation,
  jatuhTempoPajakValidation,
  jenisBBMValidation,
  jenisValidation,
  merekValidation,
  namaValidation,
  nomorPolisiValidation,
  warnaValidation,
} from '../mobil'
import { MobilForm } from '@/models/mobil-model'

export async function checkMobilValidation(action: string, form: MobilForm): Promise<boolean> {
  const appStore = useAppStore()
  const [merk, jenis, nomorPolisi, nama, jenisBbm, warna, harga, biayaPajak, jatuhTempo] =
    await Promise.all([
      merekValidation(form.merek.value),
      jenisValidation(form.jenis.value),
      nomorPolisiValidation(form.nomor_polisi.value),
      namaValidation(form.nama.value),
      jenisBBMValidation(form.jenis_bbm.value),
      warnaValidation(form.warna.value),
      hargaValidation(form.harga.value),
      biayaPajakValidation(form.biaya_pajak.value),
      jatuhTempoPajakValidation(form.jatuh_tempo_pajak.value),
    ])
  const isValidationValid =
    !merk.error &&
    !jenis.error &&
    !nomorPolisi.error &&
    !nama.error &&
    !jenisBbm.error &&
    !warna.error &&
    !harga.error &&
    !biayaPajak.error &&
    !jatuhTempo.error

  if (!isValidationValid) {
    const merek = form.merek.error
    const jenis = form.jenis.error
    const nomor_polisi = form.nomor_polisi.error
    const nama = form.nama.error
    const jenis_bbm = form.jenis_bbm.error
    const warna = form.warna.error
    const harga = form.harga.error
    const biaya_pajak = form.biaya_pajak.error
    const jatuh_tempo_pajak = form.jatuh_tempo_pajak.error

    appStore.setAlerts(
      'error',
      'Aksi Gagal',
      `${merek ? `${merek}\n` : ''}${jenis ? `${jenis}\n` : ''}${nomor_polisi ? `${nomor_polisi}\n` : ''}${nama ? `${nama}\n` : ''}${jenis_bbm ? `${jenis_bbm}\n` : ''}${warna ? `${warna}\n` : ''}${harga ? `${harga}\n` : ''}${biaya_pajak ? `${biaya_pajak}\n` : ''}${jatuh_tempo_pajak ? `${jatuh_tempo_pajak}\n` : ''}`,
    )

    return false
  }

  return true
}
