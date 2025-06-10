import type { User } from './user-model'

export interface Notifikasi {
  id: number
  pesan: string
  tanggal: Date
  convert_tanggal: string
  status_baca: boolean
  id_user_pengirim: number
  nama_lengkap_pengirim: string
  id_user_penerima: number
  nama_lengkap_penerima: string
  path: string | null
}

export interface FormattedNotifikasi {
  id: number
  nomor: number
  pesan: string
  tanggal: string
  status_baca: boolean
  id_user_pengirim: number
  nama_lengkap_pengirim: string
  id_user_penerima: number
  nama_lengkap_penerima: string
  path: string | null
}

export interface NotifikasiForm {
  pesan: {
    value: string
    error: string
  }
  tanggal: {
    value: Date | null
    error: string
  }
  status_baca: {
    value: boolean
    error: string
  }
  user_pengirim: {
    value: User | null
    error: string
  }
  user_penerima: {
    value: User | null
    error: string
  }
  path: {
    value: string | null
    error: string
  }
}
