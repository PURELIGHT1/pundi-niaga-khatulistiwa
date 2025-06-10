export interface PKS {
  id: number
  nama: string
  is_active: boolean
}

export interface FormattedPKS {
  id: number
  nomor: number
  nama: string
  is_active: boolean
}

export interface PKSForm {
  nama: {
    value: string
    error: string
  }
  is_active: {
    value: boolean | null
    error: string
  }
}

export const StatusPKS = [
  { value: true, label: 'Aktif' },
  { value: false, label: 'Non-Aktif' },
] as const
