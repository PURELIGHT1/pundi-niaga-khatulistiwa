import { ActionModel } from '@/models/action-model'
import { useAppStore } from '@/stores/app-store'
import { useLocalStorage } from '@vueuse/core'
import { FormattedPendapatan, Pendapatan, PendapatanForm } from '@/models/pendapatan-model'
import { Sopir } from '@/models/sopir-model'
import { Mobil } from '@/models/mobil-model'
import { checkPendapatanValidation } from '../validation/check-validation'
import { checkDeletePendapatanValidation } from '../validation/pendapatan'
import PendapatanDialogView from '@/views/dialogs/PendapatanDialogView.vue'

export function pendapatanActions() {
  const appStore = useAppStore()
  const pendapatans = useLocalStorage<Pendapatan[]>('pendapatans', []).value

  const createPendapatan = async (form: PendapatanForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkPendapatanValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const sopir = form.sopir.value as Sopir
    const mobil = form.mobil.value as Mobil
    const spk = form.spk.value
    const tanggal_muat = form.tanggal_muat.value as Date
    const tanggal_bongkar = form.tanggal_bongkar.value as Date
    const timbangan_muat = Number(form.timbangan_muat.digit)
    const timbangan_bongkar = Number(form.timbangan_bongkar.digit)
    const ongkos_angkut = Number(form.ongkos_angkut.digit)
    const harga_klaim_susut = Number(form.harga_klaim_susut.digit)
    const selisih_berat = timbangan_bongkar - timbangan_muat
    const persen_susut = selisih_berat / timbangan_muat
    const sub_total = Math.floor(ongkos_angkut * timbangan_bongkar)
    const ppn = Math.floor((sub_total * 11) / 100)
    const pph = Math.floor((sub_total * 2) / 100)
    const klaim_susut = Math.floor(harga_klaim_susut * selisih_berat)
    const pendapatan_bruto = Math.floor(sub_total + ppn - (pph + klaim_susut))

    pendapatans.push({
      id: pendapatans.length === 0 ? 1 : pendapatans[pendapatans.length - 1].id + 1,
      id_sopir: sopir.id,
      id_mobil: mobil.id,
      spk: spk,
      tanggal_muat: tanggal_muat,
      tanggal_bongkar: tanggal_bongkar,
      timbangan_muat: timbangan_muat,
      timbangan_bongkar: timbangan_bongkar,
      selisih_berat: selisih_berat,
      persen_susut: persen_susut,
      ongkos_angkut: ongkos_angkut,
      harga_klaim_susut: harga_klaim_susut,
      sub_total: sub_total,
      ppn: ppn,
      pph: pph,
      klaim_susut: klaim_susut,
      pendapatan_bruto: pendapatan_bruto,
      is_active: true,
      butuh_konfirmasi: false,
    })

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Tambah Data Pendapatan')
  }

  const updatePendapatan = async (form: PendapatanForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkPendapatanValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const item = appStore.dialog.item as FormattedPendapatan
    const spk = form.spk.value
    const sopir = form.sopir.value as Sopir
    const mobil = form.mobil.value as Mobil
    const tanggal_muat = form.tanggal_muat.value as Date
    const tanggal_bongkar = form.tanggal_bongkar.value as Date
    const timbangan_muat = Number(form.timbangan_muat.digit)
    const timbangan_bongkar = Number(form.timbangan_bongkar.digit)
    const ongkos_angkut = Number(form.ongkos_angkut.digit)
    const harga_klaim_susut = Number(form.harga_klaim_susut.digit)
    const selisih_berat = timbangan_bongkar - timbangan_muat
    const persen_susut = selisih_berat / timbangan_muat
    const sub_total = Math.floor(ongkos_angkut * timbangan_bongkar)
    const ppn = Math.floor((sub_total * 11) / 100)
    const pph = Math.floor((sub_total * 2) / 100)
    const klaim_susut = Math.floor(harga_klaim_susut * selisih_berat)
    const pendapatan_bruto = Math.floor(sub_total + ppn - (pph + klaim_susut))

    const index = pendapatans.findIndex((pendapatan) => pendapatan.id === item.id)
    if (index !== -1) {
      pendapatans[index].id_sopir = sopir.id
      pendapatans[index].id_mobil = mobil.id
      pendapatans[index].spk = spk
      pendapatans[index].tanggal_muat = tanggal_muat
      pendapatans[index].tanggal_bongkar = tanggal_bongkar
      pendapatans[index].timbangan_muat = timbangan_muat
      pendapatans[index].timbangan_bongkar = timbangan_bongkar
      pendapatans[index].selisih_berat = selisih_berat
      pendapatans[index].persen_susut = persen_susut
      pendapatans[index].ongkos_angkut = ongkos_angkut
      pendapatans[index].harga_klaim_susut = harga_klaim_susut
      pendapatans[index].sub_total = sub_total
      pendapatans[index].ppn = ppn
      pendapatans[index].pph = pph
      pendapatans[index].klaim_susut = klaim_susut
      pendapatans[index].pendapatan_bruto = pendapatan_bruto
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Ubah Data Pendapatan')
  }

  const deletePendapatan = async (form: PendapatanForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    const item = appStore.dialog.item as FormattedPendapatan
    appStore.loading = true
    const response = await checkDeletePendapatanValidation(extraData?.action ?? '')
    if (!response.value) {
      appStore.loading = false
      appStore.setDialog(item, PendapatanDialogView, 'konfirmasi')
      return
    }

    const index = pendapatans.findIndex((pendapatan) => pendapatan.id === item.id)
    if (index !== -1) {
      pendapatans[index].is_active = false
    }
    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Hapus Data Pendapatan')
  }

  const konfirmasiPendapatan = async (form: PendapatanForm) => {
    if (appStore.loading) {
      return
    }
    const item = appStore.dialog.item as FormattedPendapatan

    const index = pendapatans.findIndex((pendapatan) => pendapatan.id === item.id)

    if (index !== -1) {
      pendapatans[index].butuh_konfirmasi = true
    }
    afterAction(form)
    appStore.setAlerts(
      'success',
      'Aksi Berhasil',
      'Berhasil Kirim Konfirmasi Hapus Data Pendapatan',
    )
  }

  const afterAction = (form: PendapatanForm) => {
    resetForm(form)
    appStore.resetDialog()
  }

  const resetForm = (form: PendapatanForm) => {
    form.sopir.value = null
    form.sopir.error = ''

    form.mobil.value = null
    form.mobil.error = ''

    form.spk.value = ''
    form.spk.error = ''

    form.tanggal_muat.value = null
    form.tanggal_muat.error = ''

    form.tanggal_bongkar.value = null
    form.tanggal_bongkar.error = ''

    form.timbangan_muat.value = ''
    form.timbangan_muat.digit = ''
    form.timbangan_muat.error = ''

    form.timbangan_bongkar.value = ''
    form.timbangan_bongkar.digit = ''
    form.timbangan_bongkar.error = ''

    form.ongkos_angkut.value = ''
    form.ongkos_angkut.digit = ''
    form.ongkos_angkut.error = ''

    form.harga_klaim_susut.value = ''
    form.harga_klaim_susut.digit = ''
    form.harga_klaim_susut.error = ''
  }

  return {
    createPendapatan,
    updatePendapatan,
    deletePendapatan,
    konfirmasiPendapatan,
    resetForm,
  }
}
