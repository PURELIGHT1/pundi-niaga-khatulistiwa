import { Mobil } from './mobil-model'

export interface Pengeluaran {
  id: number
  id_mobil: string | null
  tipe: PengeluaranType
  keterangan: string
  biaya: number
  tanggal: Date
  is_active: boolean
}

export interface FormattedPengeluaran {
  id: number
  id_mobil: number | null
  mobil: string | null
  nomor: number
  tipe: string
  keterangan: string
  biaya: string
  tanggal: string
  is_active: boolean
}

export interface PengeluaranForm {
  mobil: {
    value: Mobil | null
    error: string
  }
  tipe: {
    value: PengeluaranType | null
    error: string
  }
  keterangan: {
    value: string
    error: string
  }
  biaya: {
    value: string
    digit: string
    error: string
  }
  tanggal: {
    value: Date | null
    error: string
  }
}

export enum PengeluaranType {
  Mobil = 'mobil',
  GajiPegawai = 'gaji-pegawai',
  BeliATK = 'beli-atk',
  BeliSparepart = 'beli-sparepart',
  BayarPengesup = 'bayar-pengesup',
}
