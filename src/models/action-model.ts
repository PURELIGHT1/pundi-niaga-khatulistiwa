import { DialogAction } from '@/models/app-model'

export interface ActionModel {
  isValidationValid: boolean
  action: DialogAction
}

export enum userFieldForm {
  nama_lengkap = 'nama_lengkap',
  nomor_hp = 'nomor_hp',
  email = 'email',
  kata_sandi = 'kata_sandi',
}

export enum sopirFieldForm {
  nama_lengkap = 'nama_lengkap',
  nomor_hp = 'nomor_hp',
  nomor_sim = 'nomor_sim',
  asal_pks = 'asal_pks',
  tujuan_pks = 'tujuan_pks',
  uang_minyak = 'uang_minyak',
}

export enum mobilFieldForm {
  merk = 'merk',
  nama = 'nama',
  jenis = 'jenis',
  nomor_polisi = 'nomor_polisi',
  jenis_bbm = 'jenis_bbm',
  warna = 'warna',
  harga = 'harga',
  biaya_pajak = 'biaya_pajak',
  jatuh_tempo_pajak = 'jatuh_tempo_pajak',
}

export enum sparePartFieldForm {
  merek = 'merek',
  jenis = 'jenis',
  nama = 'nama',
  harga = 'harga',
  stok = 'stok',
  status_pembelian = 'status_pembelian',
}

export enum pendapatanFieldForm {
  sopir = 'sopir',
  mobil = 'mobil',
  spk = 'spk',
  tanggal_muat = 'tanggal_muat',
  tanggal_bongkar = 'tanggal_bongkar',
  timbang_muat = 'timbang_muat',
  timbang_bongkar = 'timbang_bongkar',
  ongkos_angkut = 'ongkos_angkut',
  harga_klaim_susut = 'harga_klaim_susut',
}

export enum pengeluaranFieldForm {
  tipe = 'tipe',
  mobil = 'mobil',
  keterangan = 'keterangan',
  biaya = 'biaya',
  tanggal = 'tanggal',
}

export enum pksFieldForm {
  nama = 'nama',
  status = 'status',
}
