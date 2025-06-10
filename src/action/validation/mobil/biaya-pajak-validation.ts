import i18n from '@/plugins/i18n'
import { useMobilStore } from '@/stores/mobil-store'
import { nextTick } from 'vue'

export async function biayaPajakValidation(
  biaya_pajak: string,
): Promise<{ value: string; digit: string; error: string }> {
  const sopirStore = useMobilStore()
  const regex1 = /\D+/g
  const regex2 = /^0\d+/g
  const regex3 = /[.]+|\D+/g
  let value = biaya_pajak
  let error = ''
  let digit = ''

  value = value.replace(regex1, '').replace(regex2, '0')

  if (!value) {
    error = 'Biaya Pajak Tidak Boleh Kosong!'
  } else {
    digit = value.replace(regex3, '')

    if (digit.length > 9) {
      digit = digit.substring(0, 9)
    }

    value = i18n.global.n(Number(digit), 'decimal', 'id')
  }

  await nextTick(() => {
    sopirStore.form.biaya_pajak.value = value
    sopirStore.form.biaya_pajak.digit = digit
    sopirStore.form.biaya_pajak.error = error
  })

  return { value, digit, error }
}
