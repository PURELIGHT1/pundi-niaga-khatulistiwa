import { useMobilStore } from '@/stores/mobil-store'
import { nextTick } from 'vue'

export async function jenisValidation(jenis: string): Promise<{ value: string; error: string }> {
  const mobileStore = useMobilStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = jenis
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Jenis Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Jenis Terlalu Panjang!'
  }

  await nextTick(() => {
    mobileStore.form.jenis.value = value
    mobileStore.form.jenis.error = error
  })

  return { value, error }
}
