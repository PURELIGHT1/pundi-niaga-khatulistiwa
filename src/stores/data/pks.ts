import type { FormattedPKS, PKS } from '@/models/pks-model'

export function getFormattedPKSes(pks: PKS[]): FormattedPKS[] {
  return pks.map((pks, index) => {
    return {
      id: pks.id,
      nomor: index + 1,
      nama: pks.nama,
      is_active: pks.is_active,
    }
  })
}

export function initializePKSes(): PKS[] {
  return [
    {
      id: 1,
      nama: 'PTN Perkebunan A',
      is_active: true,
    },
    {
      id: 2,
      nama: 'PTN Perkebunan B',
      is_active: true,
    },
    {
      id: 3,
      nama: 'PTN Perkebunan C',
      is_active: true,
    },
    {
      id: 4,
      nama: 'PTN Perkebunan D',
      is_active: true,
    },
    {
      id: 5,
      nama: 'PTN Perkebunan E',
      is_active: false,
    },
  ]
}
