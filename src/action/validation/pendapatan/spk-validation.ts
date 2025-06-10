import { usePendapatanStore } from '@/stores/pendapatan-store'
import { nextTick } from 'vue'

export async function SPKValidation(spk: string): Promise<{ value: string | null; error: string }> {
  const pendapatanStore = usePendapatanStore()
  const regex1 = /\s+/g

  let value = spk
  let error = ''

  value = value.replace(regex1, '')

  if (!value) {
    error = 'SPK Tidak Boleh Kosong!'
  } else if (value.length > 100) {
    error = 'SPK Terlalu Panjang!'
  }

  await nextTick(() => {
    pendapatanStore.form.spk.value = value
    pendapatanStore.form.spk.error = error
  })

  return { value, error }
}
