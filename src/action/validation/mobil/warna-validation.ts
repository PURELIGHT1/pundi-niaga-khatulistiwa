import { MobilWarna } from '@/models/mobil-model'
import { useMobilStore } from '@/stores/mobil-store'
import { nextTick } from 'vue'

export async function warnaValidation(
  warna: string | null,
): Promise<{ value: string | null; error: string }> {
  const mobileStore = useMobilStore()

  const value = warna
  let error = ''

  if (!value) {
    error = 'Warna Tidak Boleh Kosong!'
  } else {
    const found = MobilWarna.find((w) => w.value === value) ?? null
    if(found === null){
      error = 'Warna Tidak Valid!'
    }
  }

  await nextTick(() => {
    mobileStore.form.warna.value = value ?? ''
    mobileStore.form.warna.error = error
  })

  return { value, error }
}
