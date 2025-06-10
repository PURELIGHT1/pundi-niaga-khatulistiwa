import { ActionModel } from '@/models/action-model'
import { useAppStore } from '@/stores/app-store'
import { useLocalStorage } from '@vueuse/core'
import {
  FormattedSparePart,
  SparePart,
  SparePartForm,
  StatusSparePart,
} from '@/models/spare-part-model'
import { checkSparePartValidation } from '../validation/check-validation'
import { UserJenis } from '@/models/user-model'
import { useNotifikasiStore } from '@/stores/notifikasi-store'
import { hargaValidation } from '../validation/mobil'
import { useUserStore } from '@/stores/user-store'

export function sparePartActions() {
  const appStore = useAppStore()
  const sparePart = useLocalStorage<SparePart[]>('spare-parts', []).value

  const createSparePart = async (form: SparePartForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    if (appStore.user.jenis !== UserJenis.Pemilik) {
      form.status_pembelian.value = StatusSparePart.BelumBeli
    }
    appStore.loading = true
    if (!(await checkSparePartValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const merek = form.merek.value
    const jenis = form.jenis.value
    const nama = form.nama.value
    const harga = Number(form.harga.digit)
    const stok = Number(form.stok.digit)
    const status_pembelian = form.status_pembelian.value as StatusSparePart

    sparePart.push({
      id: sparePart.length === 0 ? 1 : sparePart[sparePart.length - 1].id + 1,
      merek: merek,
      jenis: jenis,
      nama: nama,
      harga: harga,
      stok: stok,
      status_pembelian: status_pembelian,
      butuh_konfirmasi: appStore.user.jenis === UserJenis.Pemilik ? true : false,
    })

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Tambah Data Spare Part')
  }

  const updateSparePart = async (form: SparePartForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    if (appStore.user.jenis !== UserJenis.Pemilik) {
      form.status_pembelian.value = StatusSparePart.BelumBeli
    }

    appStore.loading = true
    if (!(await checkSparePartValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const item = appStore.dialog.item as FormattedSparePart
    const merek = form.merek.value
    const jenis = form.jenis.value
    const nama = form.nama.value
    const harga = Number(form.harga.digit)
    const stok = Number(form.stok.digit)

    const index = sparePart.findIndex((sparePart) => sparePart.id === item.id)
    if (index !== -1) {
      sparePart[index].merek = merek
      sparePart[index].jenis = jenis
      sparePart[index].nama = nama
      sparePart[index].harga = harga
      sparePart[index].stok = stok
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Ubah Data Spare Part')
  }

  const updateStatusSparePart = async (form: SparePartForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    if (!(await checkSparePartValidation(extraData?.action ?? '', form))) {
      appStore.loading = false
      return
    }

    const item = appStore.dialog.item as FormattedSparePart
    const status_pembelian = form.status_pembelian.value as StatusSparePart

    const index = sparePart.findIndex((sparePart) => sparePart.id === item.id)
    if (index !== -1) {
      sparePart[index].status_pembelian = status_pembelian
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Ubah Status Spare Part')
  }

  const konfirmasiSparePart = async (form: SparePartForm) => {
    if (appStore.loading) {
      return
    }
    const item = appStore.dialog.item as FormattedSparePart

    const index = sparePart.findIndex((sparePart) => sparePart.id === item.id)

    if (index !== -1) {
      sparePart[index].butuh_konfirmasi = true
    }
    if (index !== -1) {
      const notifikasiStore = useNotifikasiStore()
      const userStore = useUserStore()
      const pemilik = userStore.users.find((user) => user.jenis === UserJenis.Pemilik)
      const sparetPart = sparePart[index]
      notifikasiStore.form = {
        ...notifikasiStore.form,
        pesan: {
          value: `Konfirmasi Pembelian Spare Part ${sparetPart.nama} dengan harga Rp ${(await hargaValidation(sparetPart.harga.toString())).value} dan stok ${sparetPart.stok}`,
          error: '',
        },
        tanggal: {
          value: new Date(),
          error: '',
        },
        status_baca: {
          value: false,
          error: '',
        },
        user_pengirim: {
          value: appStore.user,
          error: '',
        },
        user_penerima: {
          value: pemilik ?? null,
          error: '',
        },
        path: {
          value: '/spare-part',
          error: '',
        },
      }

      await notifikasiStore.createNotifikasi()
    }
    afterAction(form)
    appStore.setAlerts(
      'success',
      'Aksi Berhasil',
      'Berhasil Kirim Konfirmasi Hapus Data Pendapatan',
    )
  }

  const deleteSparePart = async (form: SparePartForm) => {
    if (appStore.loading) {
      return
    }

    appStore.loading = true
    const item = appStore.dialog.item as FormattedSparePart
    const index = sparePart.findIndex((sparePart) => sparePart.id === item.id)

    if (index !== -1) {
      sparePart.splice(index, 1)
    }

    afterAction(form)
    appStore.setAlerts('success', 'Aksi Berhasil', 'Berhasil Hapus Data Spare Part')
  }

  const afterAction = (form: SparePartForm) => {
    resetForm(form)
    appStore.resetDialog()
  }

  const resetForm = (form: SparePartForm) => {
    form.merek.value = ''
    form.merek.error = ''

    form.jenis.value = ''
    form.jenis.error = ''

    form.nama.value = ''
    form.nama.error = ''

    form.harga.value = ''
    form.harga.digit = ''
    form.harga.error = ''

    form.stok.value = ''
    form.stok.digit = ''
    form.stok.error = ''

    form.status_pembelian.value = null
    form.status_pembelian.error = ''
  }

  return {
    createSparePart,
    updateSparePart,
    updateStatusSparePart,
    deleteSparePart,
    konfirmasiSparePart,
    resetForm,
  }
}
