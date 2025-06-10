import { usePengeluaranStore } from '@/stores/pengeluaran-store'
import { nextTick } from 'vue'

export async function keteranganValidation(
  keterangan: string,
): Promise<{ value: string; error: string }> {
  const pengeluaranStore = usePengeluaranStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = keterangan
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Keterangan Tidak Boleh Kosong!'
  } else if (value.length > 500) {
    error = 'Keterangan Terlalu Panjang!'
  }

  await nextTick(() => {
    pengeluaranStore.form.keterangan.value = value
    pengeluaranStore.form.keterangan.error = error
  })

  return { value, error }
}
