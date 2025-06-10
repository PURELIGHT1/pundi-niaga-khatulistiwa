import { nextTick } from 'vue'
import { useSparePartStore } from '@/stores/spare-part-store'

export async function merekValidation(merk: string): Promise<{ value: string; error: string }> {
  const sparePartStore = useSparePartStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = merk
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Merek Spare Part Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Merek Spare Part Terlalu Panjang!'
  }

  await nextTick(() => {
    sparePartStore.form.merek.value = value
    sparePartStore.form.merek.error = error
  })

  return { value, error }
}
