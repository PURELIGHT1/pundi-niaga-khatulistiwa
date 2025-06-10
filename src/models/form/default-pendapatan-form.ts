import type { PendapatanForm } from '../pendapatan-model'

export const defaultPendapatanForm: PendapatanForm = {
  sopir: {
    value: null,
    error: '',
  },
  mobil: {
    value: null,
    error: '',
  },
  spk: {
    value: '',
    error: '',
  },
  tanggal_muat: {
    value: null,
    error: '',
  },
  tanggal_bongkar: {
    value: null,
    error: '',
  },
  timbangan_muat: {
    value: '',
    digit: '',
    error: '',
  },
  timbangan_bongkar: {
    value: '',
    digit: '',
    error: '',
  },
  ongkos_angkut: {
    value: '',
    digit: '',
    error: '',
  },
  harga_klaim_susut: {
    value: '',
    digit: '',
    error: '',
  },
}
