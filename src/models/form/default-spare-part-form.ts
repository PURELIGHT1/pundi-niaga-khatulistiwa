import { SparePartForm } from '../spare-part-model'

export const defaultSparePartForm: SparePartForm = {
  merek: {
    value: '',
    error: '',
  },
  jenis: {
    value: '',
    error: '',
  },
  nama: {
    value: '',
    error: '',
  },
  harga: {
    value: '',
    digit: '',
    error: '',
  },
  stok: {
    value: '',
    digit: '',
    error: '',
  },
  status_pembelian: {
    value: null,
    error: '',
  },
}
