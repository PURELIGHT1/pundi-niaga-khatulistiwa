export interface Mobil {
  id: number
  merek: string
  jenis: string
  nomor_polisi: string
  nama: string
  jenis_bbm: MobilJenisBBM
  warna: string
  harga: number
  biaya_pajak: number
  jatuh_tempo_pajak: Date
  jumlah_pendapatan: number
  jumlah_pengeluaran: number
  jumlah_penggunaan: number
  status_pajak: 'secure' | 'warning' | null
  status_bayar_pajak: boolean
  send_notif: boolean
}

export interface FormattedMobil {
  id: number
  nomor: number
  merek: string
  jenis: string
  nomor_polisi: string
  nama: string
  jenis_bbm: string
  warna: string
  harga: string
  biaya_pajak: string
  jatuh_tempo_pajak: string
  jumlah_pendapatan: string
  jumlah_pengeluaran: string
  jumlah_penggunaan: string
  status_pajak: string | null
  status_bayar_pajak: boolean
  send_notif: boolean
}

export interface MobilForm {
  merek: {
    value: string
    error: string
  }
  jenis: {
    value: string
    error: string
  }
  nomor_polisi: {
    value: string
    error: string
  }
  nama: {
    value: string
    error: string
  }
  jenis_bbm: {
    value: MobilJenisBBM | null
    error: string
  }
  warna: {
    value: string
    error: string
  }
  harga: {
    value: string
    digit: string
    error: string
  }
  biaya_pajak: {
    value: string
    digit: string
    error: string
  }
  jatuh_tempo_pajak: {
    value: Date | null
    error: string
  }
}

export enum MobilJenisBBM {
  Solar = 'Solar',
  Dexlite = 'Dexlite',
  PertaminaDex = 'Pertamina Dex',
  Pertalite = 'Pertalite',
  Pertamax = 'Pertamax',
  PertamaxTurbo = 'Pertamax Turbo',
}

export const MobilWarna = [
  { value: 'Merah', color: 'red' },
  { value: 'Merah Muda', color: 'pink' },
  { value: 'Ungu', color: 'purple' },
  { value: 'Nila', color: 'indigo' },
  { value: 'Biru', color: 'blue' },
  { value: 'Biru Muda', color: 'cyan' },
  { value: 'Biru Kehijauan', color: 'teal' },
  { value: 'Hijau', color: 'green' },
  { value: 'Hijau Muda', color: 'lime' },
  { value: 'Kuning', color: 'yellow' },
  { value: 'Kuning Tua', color: 'amber' },
  { value: 'Orange', color: 'orange' },
  { value: 'Cokelat', color: 'brown' },
  { value: 'Abu-Abu', color: 'grey' },
  { value: 'Putih', color: 'white' },
  { value: 'Hitam', color: 'black' },
] as const
