import { nextTick } from 'vue'
import { useUserStore } from '@/stores/user-store'

export async function kataSandiValidation(
  kata_sandi: string,
): Promise<{ value: string; error: string }> {
  const userStore = useUserStore()
  const regex1 = / {2,}/g
  const regex2 = /^ {1,}/gm

  let value = kata_sandi
  let error = ''

  value = value.replace(regex1, ' ').replace(regex2, '')

  if (!value) {
    error = 'Kata Sandi Tidak Boleh Kosong!'
  } else if (value.length < 6) {
    error = 'Kata Sandi Terlalu Pendek!'
  } else if (value.length > 50) {
    error = 'Kata Sandi Terlalu Panjang!'
  }

  await nextTick(() => {
    userStore.form.kata_sandi.value = value
    userStore.form.kata_sandi.error = error
  })

  return { value, error }
}
