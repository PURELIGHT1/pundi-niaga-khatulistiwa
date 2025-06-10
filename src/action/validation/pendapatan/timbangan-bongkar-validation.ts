import i18n from '@/plugins/i18n'
import { usePendapatanStore } from '@/stores/pendapatan-store'
import { nextTick } from 'vue'

export async function timbanganBongkarValidation(
  timbangan_bongkar: string,
): Promise<{ value: string; digit: string; error: string }> {
  const pendapatanStore = usePendapatanStore()
  const regex1 = /\D+/g
  const regex2 = /^0\d+/g
  const regex3 = /[.]+|\D+/g
  let value = timbangan_bongkar
  let error = ''
  let digit = ''

  value = value.replace(regex1, '').replace(regex2, '0')

  if (!value) {
    error = 'Timbangan Bongkar Tidak Boleh Kosong!'
  } else {
    digit = value.replace(regex3, '')

    if (digit.length > 9) {
      digit = digit.substring(0, 9)
    }

    value = i18n.global.n(Number(digit), 'decimal', 'id')
  }

  await nextTick(() => {
    pendapatanStore.form.timbangan_bongkar.value = value
    pendapatanStore.form.timbangan_bongkar.digit = digit
    pendapatanStore.form.timbangan_bongkar.error = error
  })

  return { value, digit, error }
}
