import { nextTick } from 'vue'
import { useUserStore } from '@/stores/user-store'

export async function emailValidation(email: string): Promise<{ value: string; error: string }> {
  const userStore = useUserStore()

  const regex1 = /[^a-zA-Z0-9._%+-@.]/g
  const regex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  let value = email
  let error = ''

  value = value.replace(regex1, '')

  if (!value) {
    error = 'Email Tidak Boleh Kosong!'
  } else if (value.length > 50) {
    error = 'Email Terlalu Panjang!'
  } else if (!value.match(regex2)) {
    error = 'Email Tidak Sesuai Format!'
  }

  await nextTick(() => {
    userStore.form.email.value = value
    userStore.form.email.error = error
  })

  return { value, error }
}
