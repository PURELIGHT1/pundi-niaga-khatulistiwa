import type { UserForm } from '@/models/user-model'
import { useAppStore } from '@/stores/app-store'
import {
  emailValidation,
  kataSandiValidation,
  namaLengkapValidation,
  nomorHpValidation,
} from '../user'

export async function checkUserValidation(action: string, form: UserForm): Promise<boolean> {
  const appStore = useAppStore()
  const [namaLengkap, nomorHp, email, kataSandi] = await Promise.all([
    action !== 'login' ? namaLengkapValidation(form.nama_lengkap.value) : { error: '' },
    action !== 'login' ? nomorHpValidation(form.nomor_hp.value) : { error: '' },
    emailValidation(form.email.value),
    action === 'updatePassword' ? kataSandiValidation(form.kata_sandi.value) : { error: '' },
  ])

  const isValidationValid = !namaLengkap.error && !nomorHp.error && !email.error && !kataSandi.error

  if (!isValidationValid) {
    const nama_lengkap = form.nama_lengkap.error
    const nomor_hp = form.nomor_hp.error
    const email = form.email.error
    const kata_sandi = form.kata_sandi.error

    appStore.setAlerts(
      'error',
      'Aksi Gagal',
      `${nama_lengkap ? `${nama_lengkap}\n` : ''}${nomor_hp ? `${nomor_hp}\n` : ''}${email ? `${email}\n` : ''}${kata_sandi ? `${kata_sandi}\n` : ''}`,
    )

    return false
  }

  return true
}
