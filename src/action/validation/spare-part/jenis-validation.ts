import { nextTick } from 'vue'
import { useSparePartStore } from '@/stores/spare-part-store'

export async function jenisValidation(jenis: string): Promise<{ value: string; error: string }> {
  const sparePartStore = useSparePartStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = jenis
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Jenis Spare Part Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Jenis Spare Part Terlalu Panjang!'
  }

  await nextTick(() => {
    sparePartStore.form.jenis.value = value
    sparePartStore.form.jenis.error = error
  })

  return { value, error }
}
