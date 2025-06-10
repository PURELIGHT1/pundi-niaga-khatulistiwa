import { useAppStore } from '@/stores/app-store'
import type { PendapatanForm } from '@/models/pendapatan-model'
import {
  hargaKlaimSusutValidation,
  mobilValidation,
  ongkosAngkutValidation,
  sopirValidation,
  SPKValidation,
  tanggalBongkarValidation,
  tanggalMuatValidation,
  timbanganBongkarValidation,
  timbanganMuatValidation,
} from '../pendapatan'

export async function checkPendapatanValidation(
  action: string,
  form: PendapatanForm,
): Promise<boolean> {
  const appStore = useAppStore()
  const [
    sopir,
    mobil,
    spk,
    tanggalMuat,
    tanggalBongkar,
    timbanganMuat,
    timbanganBongkar,
    ongkosAngkut,
    hargaKlaimSusut,
  ] = await Promise.all([
    sopirValidation(form.sopir.value),
    mobilValidation(form.mobil.value),
    SPKValidation(form.spk.value),
    tanggalMuatValidation(form.tanggal_muat.value),
    tanggalBongkarValidation(form.tanggal_muat.value, form.tanggal_bongkar.value),
    timbanganMuatValidation(form.timbangan_muat.value),
    timbanganBongkarValidation(form.timbangan_bongkar.value),
    ongkosAngkutValidation(form.ongkos_angkut.value),
    hargaKlaimSusutValidation(form.harga_klaim_susut.value),
  ])

  const isValidationValid =
    !sopir.error &&
    !mobil.error &&
    !spk.error &&
    !tanggalMuat.error &&
    !tanggalBongkar.error &&
    !timbanganMuat.error &&
    !timbanganBongkar.error &&
    !ongkosAngkut.error &&
    !hargaKlaimSusut.error

  if (!isValidationValid) {
    const spk = form.spk.error
    const sopir = form.sopir.error
    const mobil = form.mobil.error
    const tanggal_muat = form.tanggal_muat.error
    const tanggal_bongkar = form.tanggal_bongkar.error
    const timbangan_muat = form.timbangan_muat.error
    const timbangan_bongkar = form.timbangan_bongkar.error
    const ongkos_angkut = form.ongkos_angkut.error
    const harga_klaim_susut = form.harga_klaim_susut.error

    appStore.setAlerts(
      'error',
      'Aksi Gagal',
      `${sopir ? `${sopir}\n` : ''}${mobil ? `${mobil}\n` : ''}${spk ? `${spk}\n` : ''}${tanggal_muat ? `${tanggal_muat}\n` : ''}${tanggal_bongkar ? `${tanggal_bongkar}\n` : ''}${timbangan_muat ? `${timbangan_muat}\n` : ''}${timbangan_bongkar ? `${timbangan_bongkar}\n` : ''}${ongkos_angkut ? `${ongkos_angkut}\n` : ''}${harga_klaim_susut ? `${harga_klaim_susut}\n` : ''}`,
    )

    return false
  }

  return true
}
