import { PengeluaranForm } from '../pengeluaran-model'

export const defaultPengeluaranForm: PengeluaranForm = {
  mobil: {
    value: null,
    error: '',
  },
  tipe: {
    value: null,
    error: '',
  },
  keterangan: {
    value: '',
    error: '',
  },
  biaya: {
    value: '',
    digit: '',
    error: '',
  },
  tanggal: {
    value: null,
    error: '',
  },
}
