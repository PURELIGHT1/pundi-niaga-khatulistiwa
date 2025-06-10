export interface Sopir {
  id: number
  nama_lengkap: string
  nomor_hp: string
  nomor_sim: string
  asal_pks: string
  tujuan_pks: string
  uang_minyak: number
  jumlah_pendapatan: number
  jumlah_pengiriman: number
}

export interface FormattedSopir {
  id: number
  nomor: number
  nama_lengkap: string
  nomor_hp: string
  nomor_sim: string
  asal_pks: string
  tujuan_pks: string
  uang_minyak: string
  jumlah_pendapatan: string
  jumlah_pengiriman: string
}

export interface SopirForm {
  nama_lengkap: {
    value: string
    error: string
  }
  nomor_hp: {
    value: string
    digit: string
    error: string
  }
  nomor_sim: {
    value: string
    digit: string
    error: string
  }
  asal_pks: {
    value: string
    error: string
  }
  tujuan_pks: {
    value: string
    error: string
  }
  uang_minyak: {
    value: string
    digit: string
    error: string
  }
}
