import type { ActionModel } from '@/models/action-model'
import { useAppStore } from '@/stores/app-store'
import { useLocalStorage } from '@vueuse/core'
import type { FormattedPKS, PKS, PKSForm } from '@/models/pks-model'
import { checkPKSValidation } from '../validation/check-validation'

export function pksActions() {
  const appStore = useAppStore()
  const pks = useLocalStorage<PKS[]>('pks', []).value

  const createPKS = async (form: PKSForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkPKSValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }
    const nama = form.nama.value

    pks.push({
      id: pks.length === 0 ? 1 : pks[pks.length - 1].id + 1,
      nama: nama,
      is_active: true,
    })

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Tambah Data PKS')
  }

  const updatePKS = async (form: PKSForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkPKSValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const item = appStore.dialog.item as FormattedPKS
    const nama = form.nama.value
    const status = form.is_active.value ?? false

    const index = pks.findIndex((pks) => pks.id === item.id)
    if (index !== -1) {
      pks[index].nama = nama
      pks[index].is_active = status
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Ubah Data PKS')
  }

  const deletePKS = async (form: PKSForm) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    const item = appStore.dialog.item as FormattedPKS
    const index = pks.findIndex((pks) => pks.id === item.id)

    if (index !== -1) {
      pks[index].is_active = false
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Hapus Data PKS')
  }

  const afterAction = (form: PKSForm) => {
    resetForm(form)
    appStore.resetDialog()
  }

  const resetForm = (form: PKSForm) => {
    form.nama.value = ''
    form.nama.error = ''

    form.is_active.value = true
    form.is_active.error = ''
  }

  return {
    createPKS,
    updatePKS,
    deletePKS,
    resetForm,
  }
}
