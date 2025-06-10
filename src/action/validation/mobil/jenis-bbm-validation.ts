import { MobilJenisBBM } from '@/models/mobil-model'
import { useMobilStore } from '@/stores/mobil-store'
import { nextTick } from 'vue'

export async function jenisBBMValidation(
  jenis_bbm: MobilJenisBBM | null,
): Promise<{ value: MobilJenisBBM | null; error: string }> {
  const mobileStore = useMobilStore()
  const value = jenis_bbm
  let error = ''

  if (!value) {
    error = 'Jenis BBM Tidak Boleh Kosong!'
  } else if (!Object.values(MobilJenisBBM).includes(value)) {
    error = 'Jenis BBM Tidak Valid!'
  }

  await nextTick(() => {
    mobileStore.form.jenis_bbm.value = value
    mobileStore.form.jenis_bbm.error = error
  })

  return { value, error }
}
