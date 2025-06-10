import i18n from '@/plugins/i18n'
import { usePendapatanStore } from '@/stores/pendapatan-store'
import { nextTick } from 'vue'

export async function hargaKlaimSusutValidation(
  harga_klaim_susut: string,
): Promise<{ value: string; digit: string; error: string }> {
  const pendapatanStore = usePendapatanStore()

  const regex1 = /\D+/g
  const regex2 = /^0\d+/g
  const regex3 = /[.]+|\D+/g
  let value = harga_klaim_susut
  let error = ''
  let digit = ''

  value = value.replace(regex1, '').replace(regex2, '0')

  if (!value) {
    error = 'Harga Klaim Susut Tidak Boleh Kosong!'
  } else {
    digit = value.replace(regex3, '')

    if (digit.length > 9) {
      digit = digit.substring(0, 9)
    }

    value = i18n.global.n(Number(digit), 'decimal', 'id')
  }

  await nextTick(() => {
    pendapatanStore.form.harga_klaim_susut.value = value
    pendapatanStore.form.harga_klaim_susut.digit = digit
    pendapatanStore.form.harga_klaim_susut.error = error
  })

  return { value, digit, error }
}
