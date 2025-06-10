import type { Mobil } from '@/models/mobil-model'
import { PengeluaranType } from '@/models/pengeluaran-model'
import { useMobilStore } from '@/stores/mobil-store'
import { usePengeluaranStore } from '@/stores/pengeluaran-store'
import { nextTick } from 'vue'

export async function mobilValidation(
  tipe: PengeluaranType | null,
  mobil: Mobil | null,
): Promise<{ value: Mobil | null; error: string }> {
  const pengeluaranStore = usePengeluaranStore()
  const mobilStore = useMobilStore()
  const value = mobil
  const valueTipe = tipe
  let error = ''

  if (!valueTipe) {
    error = 'Tipe Tidak Boleh Kosong!'
  } else {
    if (valueTipe === PengeluaranType.Mobil) {
      if (!value) {
        error = 'Mobil Tidak Boleh Kosong!'
      } else if (!mobilStore.mobils.some((mobil) => mobil.id === value.id)) {
        error = 'Mobil Tidak Valid!'
      }
    }
  }

  await nextTick(() => {
    pengeluaranStore.form.mobil.value = value
    pengeluaranStore.form.mobil.error = error
  })

  return { value, error }
}
