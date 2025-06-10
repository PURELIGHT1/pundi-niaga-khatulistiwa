import { useAppStore } from '@/stores/app-store'
import type { PengeluaranForm } from '@/models/pengeluaran-model'
import {
  biayaValidation,
  keteranganValidation,
  mobilValidation,
  tanggalValidation,
  tipeValidation,
} from '../pengeluaran'

export async function checkPengeluaranValidation(
  action: string,
  form: PengeluaranForm,
): Promise<boolean> {
  const appStore = useAppStore()
  const [tipe, mobil, keterangan, biaya, tanggal] = await Promise.all([
    tipeValidation(form.tipe.value),
    mobilValidation(form.tipe.value, form.mobil.value),
    keteranganValidation(form.keterangan.value),
    biayaValidation(form.biaya.value),
    tanggalValidation(form.tanggal.value),
  ])

  const isValidationValid =
    !tipe.error && !mobil.error && !keterangan.error && !biaya.error && !tanggal.error

  if (!isValidationValid) {
    const tipe = form.tipe.error
    const mobil = form.mobil.error
    const keterangan = form.keterangan.error
    const biaya = form.biaya.error
    const tanggal = form.tanggal.error
    appStore.setAlerts(
      'error',
      'Aksi Gagal',
      `${tipe ? `${tipe}\n` : ''}${mobil ? `${mobil}\n` : ''}${keterangan ? `${keterangan}\n` : ''}${biaya ? `${biaya}\n` : ''}${tanggal ? `${tanggal}\n` : ''}`,
    )

    return false
  }

  return true
}
