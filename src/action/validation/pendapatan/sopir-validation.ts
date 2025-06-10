import { Sopir } from '@/models/sopir-model'
import { usePendapatanStore } from '@/stores/pendapatan-store'
import { useSopirStore } from '@/stores/sopir-store'
import { nextTick } from 'vue'

export async function sopirValidation(
  sopir: Sopir | null,
): Promise<{ value: Sopir | null; error: string }> {
  const pendapatanStore = usePendapatanStore()
  const sopirStore = useSopirStore()
  const value = sopir
  let error = ''

  if (!value) {
    error = 'Sopir Tidak Boleh Kosong!'
  } else if (!sopirStore.sopirs.some((sopir) => sopir.id === value.id)) {
    error = 'Sopir Tidak Valid!'
  }

  await nextTick(() => {
    pendapatanStore.form.sopir.value = value
    pendapatanStore.form.sopir.error = error
  })

  return { value, error }
}
