import { NotifikasiForm } from '../notifikasi-model'

export const defaultNotifikasiForm: NotifikasiForm = {
  pesan: {
    value: '',
    error: '',
  },
  tanggal: {
    value: null,
    error: '',
  },
  status_baca: {
    value: false,
    error: '',
  },
  user_pengirim: {
    value: null,
    error: '',
  },
  user_penerima: {
    value: null,
    error: '',
  },
  path: {
    value: null,
    error: '',
  },
}
