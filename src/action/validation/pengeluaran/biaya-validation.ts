import i18n from '@/plugins/i18n'
import { usePengeluaranStore } from '@/stores/pengeluaran-store'
import { nextTick } from 'vue'

export async function biayaValidation(
  biaya: string,
): Promise<{ value: string; digit: string; error: string }> {
  const pengeluaranStore = usePengeluaranStore()
  const regex1 = /\D+/g
  const regex2 = /^0\d+/g
  const regex3 = /[.]+|\D+/g
  let value = biaya
  let error = ''
  let digit = ''

  value = value.replace(regex1, '').replace(regex2, '0')

  if (!value) {
    error = 'Biaya Tidak Boleh Kosong!'
  } else {
    digit = value.replace(regex3, '')

    if (digit.length > 12) {
      digit = digit.substring(0, 12)
    }

    value = i18n.global.n(Number(digit), 'decimal', 'id')
  }

  await nextTick(() => {
    pengeluaranStore.form.biaya.value = value
    pengeluaranStore.form.biaya.digit = digit
    pengeluaranStore.form.biaya.error = error
  })

  return { value, digit, error }
}
