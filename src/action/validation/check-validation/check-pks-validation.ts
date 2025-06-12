import { useAppStore } from '@/stores/app-store'
import { namaValidation, statusValidation } from '../pks'
import type { PKSForm } from '@/models/pks-model'

export async function checkPKSValidation(action: string, form: PKSForm): Promise<boolean> {
  const appStore = useAppStore()
  const [nama, status] = await Promise.all([
    action !== 'update' ? namaValidation(form.nama.value, null) : namaValidation(form.nama.value, form.id.value),
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
