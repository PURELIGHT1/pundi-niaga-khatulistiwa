import { Mobil } from './mobil-model'
import { Sopir } from './sopir-model'

export interface Pendapatan {
  id: number
  id_sopir: number
  id_mobil: number
  spk: string
  tanggal_muat: Date
  tanggal_bongkar: Date
  timbangan_muat: number
  timbangan_bongkar: number //Unsigned
  selisih_berat: number //Signed
  persen_susut: number //Signed
  ongkos_angkut: number //Unsigned
  harga_klaim_susut: number //Unsigned
  sub_total: number //Signed
  ppn: number //Signed
  pph: number //Signed
  klaim_susut: number //Signed
  pendapatan_bruto: number //Signed
  is_active: boolean
  butuh_konfirmasi: boolean
}

export interface FormattedPendapatan {
  id: number
  nomor: number
  id_sopir: number
  id_mobil: number
  sopir: string
  mobil: string
  spk: string
  tanggal_muat: string
  tanggal_bongkar: string
  timbangan_muat: string
  timbangan_bongkar: string
  selisih_berat: string
  persen_susut: string
  ongkos_angkut: string
  harga_klaim_susut: string
  sub_total: string
  ppn: string
  pph: string
  klaim_susut: string
  pendapatan_bruto: string
  is_active: boolean
}

export interface PendapatanForm {
  sopir: {
    value: Sopir | null
    error: string
  }
  mobil: {
    value: Mobil | null
    error: string
  }
  spk: {
    value: string
    error: string
  }
  tanggal_muat: {
    value: Date | null
    error: string
  }
  tanggal_bongkar: {
    value: Date | null
    error: string
  }
  timbangan_muat: {
    value: string
    digit: string
    error: string
  }
  timbangan_bongkar: {
    value: string
    digit: string
    error: string
  }
  ongkos_angkut: {
    value: string
    digit: string
    error: string
  }
  harga_klaim_susut: {
    value: string
    digit: string
    error: string
  }
}
export interface DeletePendapatan {
  response: {
    value: boolean | number
    error: string | null
  }
}
