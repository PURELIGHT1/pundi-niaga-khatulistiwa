import { useMobilStore } from '@/stores/mobil-store'
import { nextTick } from 'vue'

export async function merekValidation(merek: string): Promise<{ value: string; error: string }> {
  const mobileStore = useMobilStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = merek
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Merek Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Merek Terlalu Panjang!'
  }

  await nextTick(() => {
    mobileStore.form.merek.value = value
    mobileStore.form.merek.error = error
  })

  return { value, error }
}
