import type { FormattedSparePart, SparePart, StatusSparePart } from '@/models/spare-part-model'
import i18n from '@/plugins/i18n'

export function getFormattedSpareParts(spare_parts: SparePart[]): FormattedSparePart[] {
  return spare_parts.map((spare_part, index) => {
    const harga = `${i18n.global.n(spare_part.harga, 'currency', 'id')}`
    const stok = `${i18n.global.n(spare_part.stok, 'decimal', 'id')}`

    return {
      id: spare_part.id,
      nomor: index + 1,
      merek: spare_part.merek,
      jenis: spare_part.jenis,
      nama: spare_part.nama,
      harga: harga,
      stok: stok,
      status_pembelian: spare_part.status_pembelian,
      butuh_konfirmasi: spare_part.butuh_konfirmasi,
    }
  })
}

export function initializeSpareParts(): SparePart[] {
  return [
    {
      id: 1,
      merek: 'Astra Otoparts',
      jenis: 'Engine Parts',
      nama: 'Piston Kit',
      harga: 500000,
      stok: 741,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 2,
      merek: 'Astra Otoparts',
      jenis: 'Electrical Parts',
      nama: 'Spark Plug (Busi)',
      harga: 30000,
      stok: 237,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 3,
      merek: 'Denso',
      jenis: 'Air Conditioning Parts',
      nama: 'AC Compressor',
      harga: 1500000,
      stok: 664,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 4,
      merek: 'Denso',
      jenis: 'Air Conditioning Parts',
      nama: 'Condenser',
      harga: 1000000,
      stok: 618,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 5,
      merek: 'Denso',
      jenis: 'Electrical Parts',
      nama: 'Ignition Coil',
      harga: 500000,
      stok: 439,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 6,
      merek: 'Denso',
      jenis: 'Electrical Parts',
      nama: 'Oxygen Sensor',
      harga: 400000,
      stok: 129,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 7,
      merek: 'Bosch',
      jenis: 'Brake Parts',
      nama: 'Brake Pads',
      harga: 250000,
      stok: 0,
      status_pembelian: StatusSparePart.SudahBeli,
      butuh_konfirmasi: false,
    },
    {
      id: 8,
      merek: 'Bosch',
      jenis: 'Brake Parts',
      nama: 'Brake Discs',
      harga: 350000,
      stok: 94,
      status_pembelian: StatusSparePart.BelumBeli,
      butuh_konfirmasi: false,
    },
  ]
}
