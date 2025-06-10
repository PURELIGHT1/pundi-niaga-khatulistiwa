import { ActionModel } from '@/models/action-model'
import { useAppStore } from '@/stores/app-store'
import { useLocalStorage } from '@vueuse/core'
import { FormattedSopir, Sopir, SopirForm } from '@/models/sopir-model'
import { checkSopirValidation } from '../validation/check-validation'

export function sopirActions() {
  const appStore = useAppStore()
  const sopirs = useLocalStorage<Sopir[]>('sopirs', []).value

  const createSopir = async (form: SopirForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkSopirValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const nama_lengkap = form.nama_lengkap.value
    const nomor_hp = form.nomor_hp.value
    const nomor_sim = form.nomor_sim.value
    const asal_pks = form.asal_pks.value
    const tujuan_pks = form.tujuan_pks.value
    const uang_minyak = Number(form.uang_minyak.digit)

    sopirs.push({
      id: sopirs.length === 0 ? 1 : sopirs[sopirs.length - 1].id + 1,
      nama_lengkap: nama_lengkap,
      nomor_hp: `+62 ${nomor_hp}`,
      nomor_sim: nomor_sim,
      asal_pks: asal_pks,
      tujuan_pks: tujuan_pks,
      uang_minyak: uang_minyak,
      jumlah_pendapatan: 0,
      jumlah_pengiriman: 0,
    })

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Tambah Data Sopir')
  }

  const updateSopir = async (form: SopirForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkSopirValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const item = appStore.dialog.item as FormattedSopir
    const nama_lengkap = form.nama_lengkap.value
    const nomor_hp = form.nomor_hp.value
    const nomor_sim = form.nomor_sim.value
    const asal_pks = form.asal_pks.value
    const tujuan_pks = form.tujuan_pks.value
    const uang_minyak = Number(form.uang_minyak.digit)

    const index = sopirs.findIndex((sopir) => sopir.id === item.id)
    if (index !== -1) {
      sopirs[index].nama_lengkap = nama_lengkap
      sopirs[index].nomor_hp = `+62 ${nomor_hp}`
      sopirs[index].nomor_sim = nomor_sim
      sopirs[index].asal_pks = asal_pks
      sopirs[index].tujuan_pks = tujuan_pks
      sopirs[index].uang_minyak = uang_minyak
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Ubah Data Sopir')
  }

  const deleteSopir = async (form: SopirForm) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    const item = appStore.dialog.item as FormattedSopir
    const index = sopirs.findIndex((sopir) => sopir.id === item.id)

    if (index !== -1) {
      sopirs.splice(index, 1)
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Hapus Data Sopir')
  }

  const afterAction = (form: SopirForm) => {
    resetForm(form)
    appStore.resetDialog()
  }

  const resetForm = (form: SopirForm) => {
    form.nama_lengkap.value = ''
    form.nama_lengkap.error = ''

    form.nomor_hp.value = ''
    form.nomor_hp.digit = ''
    form.nomor_hp.error = ''

    form.nomor_sim.value = ''
    form.nomor_sim.digit = ''
    form.nomor_sim.error = ''

    form.asal_pks.value = ''
    form.asal_pks.error = ''

    form.tujuan_pks.value = ''
    form.tujuan_pks.error = ''

    form.uang_minyak.value = ''
    form.uang_minyak.digit = ''
    form.uang_minyak.error = ''
  }

  return {
    createSopir,
    updateSopir,
    deleteSopir,
    resetForm,
  }
}
