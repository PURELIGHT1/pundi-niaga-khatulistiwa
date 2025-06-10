import { useSopirStore } from '@/stores/sopir-store'
import { nextTick } from 'vue'

export async function namaLengkapValidation(
  nama_lengkap: string,
): Promise<{ value: string; error: string }> {
  const sopirStore = useSopirStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm
  const regex3 = /[^a-zA-Z ]/g

  let value = nama_lengkap
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '').replace(regex3, '')

  if (!value) {
    error = 'Nama Lengkap Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Nama Lengkap Terlalu Panjang!'
  }

  await nextTick(() => {
    sopirStore.form.nama_lengkap.value = value
    sopirStore.form.nama_lengkap.error = error
  })

  return { value, error }
}
