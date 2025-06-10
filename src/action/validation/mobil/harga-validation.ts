import i18n from '@/plugins/i18n'
import { useMobilStore } from '@/stores/mobil-store'
import { nextTick } from 'vue'

export async function hargaValidation(
  harga: string,
): Promise<{ value: string; digit: string; error: string }> {
  const sopirStore = useMobilStore()
  const regex1 = /\D+/g
  const regex2 = /^0\d+/g
  const regex3 = /[.]+|\D+/g
  let value = harga
  let error = ''
  let digit = ''

  value = value.replace(regex1, '').replace(regex2, '0')

  if (!value) {
    error = 'Harga Tidak Boleh Kosong!'
  } else {
    digit = value.replace(regex3, '')

    if (digit.length > 12) {
      digit = digit.substring(0, 12)
    }

    value = i18n.global.n(Number(digit), 'decimal', 'id')
  }

  await nextTick(() => {
    sopirStore.form.harga.value = value
    sopirStore.form.harga.digit = digit
    sopirStore.form.harga.error = error
  })

  return { value, digit, error }
}
