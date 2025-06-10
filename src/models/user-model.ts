import { useUserStore } from '@/stores/user-store'

export interface User {
  id: number
  jenis: UserJenis
  nama_lengkap: string
  nomor_hp: string
  email: string
  kata_sandi: string
}

export interface FormattedUser {
  id: number
  nomor: number
  jenis: string
  nama_lengkap: string
  nomor_hp: string
  email: string
  kata_sandi: string
}

export interface UserForm {
  nama_lengkap: {
    value: string
    error: string
  }
  nomor_hp: {
    value: string
    digit: string
    error: string
  }
  email: {
    value: string
    error: string
  }
  kata_sandi: {
    value: string
    error: string
  }
}

export enum UserJenis  {
  Pemilik = 'Pemilik',
  Admin = 'Admin',
  Bengkel = 'Bengkel',
  Tamu = 'Tamu',
}

export enum UserAction {
  Login = 'login',
  Logout = 'logout',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export const akunItems = [
  { title: 'Ubah Password', onClick: null },
  { title: 'Logout', onClick: () => useUserStore().logout() },
]
