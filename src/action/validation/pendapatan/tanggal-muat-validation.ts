import { usePendapatanStore } from '@/stores/pendapatan-store'
import { nextTick } from 'vue'

export async function tanggalMuatValidation(
  tanggal_muat: Date | null,
): Promise<{ value: Date | null; error: string }> {
  const pendapatanStore = usePendapatanStore()

  const value = tanggal_muat
  let error = ''
  const date = new Date()
  date.setHours(0, 0, 0, 0)

  if (!value) {
    error = 'Tanggal Muat Tidak Boleh Kosong!'
  } else if (value.getTime() > date.getTime()) {
    error = 'Tanggal Muat Tidak Boleh Masa Depan!'
  }

  await nextTick(() => {
    pendapatanStore.form.tanggal_muat.value = value
    pendapatanStore.form.tanggal_muat.error = error
  })

  return { value, error }
}
