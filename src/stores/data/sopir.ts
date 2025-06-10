import { FormattedSopir, Sopir } from '@/models/sopir-model'
import i18n from '@/plugins/i18n'

export function getFormattedSopirs(sopirs: Sopir[]): FormattedSopir[] {
  return sopirs.map((sopir, index) => {
    const uang_minyak = `${i18n.global.n(sopir.uang_minyak, 'currency', 'id')}`
    const jumlah_pendapatan = `${i18n.global.n(sopir.jumlah_pendapatan, 'currency', 'id')}`
    const jumlah_pengiriman = `${i18n.global.n(sopir.jumlah_pengiriman, 'decimal', 'id')}`

    return {
      id: sopir.id,
      nomor: index + 1,
      nama_lengkap: sopir.nama_lengkap,
      nomor_hp: sopir.nomor_hp,
      nomor_sim: sopir.nomor_sim,
      asal_pks: sopir.asal_pks,
      tujuan_pks: sopir.tujuan_pks,
      uang_minyak: uang_minyak,
      jumlah_pendapatan: jumlah_pendapatan,
      jumlah_pengiriman: jumlah_pengiriman,
    }
  })
}

export function initializeSopirs(): Sopir[] {
  return [
    {
      id: 1,
      nama_lengkap: 'Budi Santoso',
      nomor_hp: '+62 812-3456-7890',
      nomor_sim: '1284-6521-845210',
      asal_pks: 'PT Maju Bersama',
      tujuan_pks: 'PT Cahaya Sejahtera',
      uang_minyak: 470000,
      jumlah_pendapatan: 0,
      jumlah_pengiriman: 0,
    },
    {
      id: 2,
      nama_lengkap: 'Andi Wijaya',
      nomor_hp: '+62 813-2345-6789',
      nomor_sim: '1193-7654-231098',
      asal_pks: 'PT Sukses Selalu',
      tujuan_pks: 'PT Purnama Indah',
      uang_minyak: 420000,
      jumlah_pendapatan: 0,
      jumlah_pengiriman: 0,
    },
    {
      id: 3,
      nama_lengkap: 'Siti Rahmawati',
      nomor_hp: '+62 814-5432-6789',
      nomor_sim: '1072-9834-621047',
      asal_pks: 'PT Sejahtera Abadi',
      tujuan_pks: 'PT Sumber Rejeki',
      uang_minyak: 450000,
      jumlah_pendapatan: 0,
      jumlah_pengiriman: 0,
    },
    {
      id: 4,
      nama_lengkap: 'Ahmad Hidayat',
      nomor_hp: '+62 815-6789-4321',
      nomor_sim: '1234-5678-910111',
      asal_pks: 'PT Mitra Utama',
      tujuan_pks: 'PT Dwi Tunggal',
      uang_minyak: 410000,
      jumlah_pendapatan: 0,
      jumlah_pengiriman: 0,
    },
    {
      id: 5,
      nama_lengkap: 'Dewi Sartika',
      nomor_hp: '+62 816-7890-1234',
      nomor_sim: '1345-8765-432109',
      asal_pks: 'PT Citra Nusantara',
      tujuan_pks: 'PT Sukses Selalu',
      uang_minyak: 460000,
      jumlah_pendapatan: 0,
      jumlah_pengiriman: 0,
    },
  ]
}
