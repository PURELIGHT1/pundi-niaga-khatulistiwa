import { ActionModel } from '@/models/action-model'
import { useAppStore } from '@/stores/app-store'
import { useLocalStorage } from '@vueuse/core'
import { Mobil } from '@/models/mobil-model'
import {
  FormattedPengeluaran,
  Pengeluaran,
  PengeluaranForm,
  PengeluaranType,
} from '@/models/pengeluaran-model'
import { checkPengeluaranValidation } from '../validation/check-validation'

export function pengeluaranActions() {
  const appStore = useAppStore()
  const pengeluarans = useLocalStorage<Pengeluaran[]>('pengeluarans', []).value

  const createPengeluaran = async (form: PengeluaranForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkPengeluaranValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const mobil = (form.mobil.value as Mobil) ?? null
    const tipe = form.tipe.value as PengeluaranType
    const keterangan = form.keterangan.value
    const biaya = Number(form.biaya.digit)
    const tanggal = form.tanggal.value as Date

    pengeluarans.push({
      id: pengeluarans.length === 0 ? 1 : pengeluarans[pengeluarans.length - 1].id + 1,
      id_mobil: mobil?.id.toString() ?? '',
      tipe: tipe,
      keterangan: keterangan,
      biaya: biaya,
      tanggal: tanggal,
      is_active: true,
    })

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Tambah Data Pengeluaran')
  }

  const updatePengeluaran = async (form: PengeluaranForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkPengeluaranValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const item = appStore.dialog.item as FormattedPengeluaran
    const mobil = (form.mobil.value as Mobil) ?? null
    const tipe = form.tipe.value as PengeluaranType
    const keterangan = form.keterangan.value
    const biaya = Number(form.biaya.digit)
    const tanggal = form.tanggal.value as Date

    const index = pengeluarans.findIndex((pengeluaran) => pengeluaran.id === item.id)
    if (index !== -1) {
      pengeluarans[index].id_mobil = mobil.id.toString()
      pengeluarans[index].tipe = tipe
      pengeluarans[index].keterangan = keterangan
      pengeluarans[index].biaya = Number(biaya)
      pengeluarans[index].tanggal = tanggal
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Ubah Data Pengeluaran')
  }

  const deletePengeluaran = async (form: PengeluaranForm) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    const item = appStore.dialog.item as FormattedPengeluaran
    const index = pengeluarans.findIndex((pengeluaran) => pengeluaran.id === item.id)
    if (index !== -1) {
      pengeluarans[index].is_active = false
    }
    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Hapus Data Pengeluaran')
  }

  const afterAction = (form: PengeluaranForm) => {
    resetForm(form)
    appStore.resetDialog()
  }

  const resetForm = (form: PengeluaranForm) => {
    form.mobil.value = null
    form.mobil.error = ''

    form.tipe.value = null
    form.tipe.error = ''

    form.keterangan.value = ''
    form.keterangan.error = ''

    form.biaya.value = ''
    form.biaya.digit = ''
    form.biaya.error = ''

    form.tanggal.value = null
    form.tanggal.error = ''
  }

  return {
    createPengeluaran,
    updatePengeluaran,
    deletePengeluaran,
    resetForm,
  }
}
