import { nextTick } from 'vue'
import { usePKSStore } from '@/stores/pks-store'

export async function namaValidation(nama: string): Promise<{ value: string; error: string }> {
  const pksStore = usePKSStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = nama
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Nama PKS Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Nama PKS Terlalu Panjang!'
  } else {
    if (pksStore.pks.find((pks) => pks.nama.toLowerCase() === value.toLowerCase())) {
      error = `${nama} Sudah Ditambahkan Sebelumnya!`
    }
  }
  await nextTick(() => {
    pksStore.form.nama.value = value
    pksStore.form.nama.error = error
  })

  return { value, error }
}
