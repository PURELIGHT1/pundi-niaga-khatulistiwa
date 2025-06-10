import { useAppStore } from '@/stores/app-store'
import { namaValidation, statusValidation } from '../pks'
import { PKSForm } from '@/models/pks-model'

export async function checkPKSValidation(action: string, form: PKSForm): Promise<boolean> {
  const appStore = useAppStore()
  const [nama, status] = await Promise.all([
    namaValidation(form.nama.value),
    action === 'update' ? statusValidation(form.is_active.value ?? null) : { error: '' },
  ])

  const isValidationValid = !nama.error && !status.error

  if (!isValidationValid) {
    const nama = form.nama.error
    const status = form.is_active.error

    appStore.setAlerts(
      'error',
      'Aksi Gagal',
      `${nama ? `${nama}\n` : ''}${status ? `${status}\n` : ''}`,
    )

    return false
  }

  return true
}
