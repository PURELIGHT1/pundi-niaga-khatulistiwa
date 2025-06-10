import i18n from '@/plugins/i18n'
import { usePendapatanStore } from '@/stores/pendapatan-store'
import { nextTick } from 'vue'

export async function ongkosAngkutValidation(
  ongkos_angkut: string,
): Promise<{ value: string; digit: string; error: string }> {
  const pendapatanStore = usePendapatanStore()
  const regex1 = /\D+/g
  const regex2 = /^0\d+/g
  const regex3 = /[.]+|\D+/g
  let value = ongkos_angkut
  let error = ''
  let digit = ''

  value = value.replace(regex1, '').replace(regex2, '0')

  if (!value) {
    error = 'Ongkos Angkut Tidak Boleh Kosong!'
  } else {
    digit = value.replace(regex3, '')

    if (digit.length > 6) {
      digit = digit.substring(0, 6)
    }

    value = i18n.global.n(Number(digit), 'decimal', 'id')
  }

  await nextTick(() => {
    pendapatanStore.form.ongkos_angkut.value = value
    pendapatanStore.form.ongkos_angkut.digit = digit
    pendapatanStore.form.ongkos_angkut.error = error
  })

  return { value, digit, error }
}
