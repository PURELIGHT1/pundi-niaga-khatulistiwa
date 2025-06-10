export interface SparePart {
  id: number
  merek: string
  jenis: string
  nama: string
  harga: number
  stok: number
  status_pembelian: StatusSparePart
  butuh_konfirmasi: boolean
}

export interface FormattedSparePart {
  id: number
  nomor: number
  merek: string
  jenis: string
  nama: string
  harga: string
  stok: string
  status_pembelian: string
}

export interface SparePartForm {
  merek: {
    value: string
    error: string
  }
  jenis: {
    value: string
    error: string
  }
  nama: {
    value: string
    error: string
  }
  harga: {
    value: string
    digit: string
    error: string
  }
  stok: {
    value: string
    digit: string
    error: string
  }
  status_pembelian: {
    value: StatusSparePart | null
    error: string
  }
}

export enum StatusSparePart {
  SudahBeli = 'Sudah Beli',
  BelumBeli = 'Belum Beli',
}
