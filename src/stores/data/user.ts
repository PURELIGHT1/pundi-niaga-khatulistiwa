import { FormattedUser, User, UserJenis } from '@/models/user-model'

export function initializeUsers(): User[] {
  return [
    {
      id: 1,
      jenis: UserJenis.Pemilik,
      nama_lengkap: 'Pundi Niaga Khatulistiwa',
      nomor_hp: '+62 800-0000-0000',
      email: 'owner@gmail.com',
      kata_sandi: '123123',
    },
    {
      id: 2,
      jenis: UserJenis.Admin,
      nama_lengkap: 'Rina Susanti',
      nomor_hp: '+62 812-3456-7891',
      email: 'rina.susanti@example.com',
      kata_sandi: 'admin2023',
    },
    {
      id: 3,
      jenis: UserJenis.Admin,
      nama_lengkap: 'Agus Pratama',
      nomor_hp: '+62 813-4567-8902',
      email: 'agus.pratama@example.com',
      kata_sandi: 'pratama2023',
    },
    {
      id: 4,
      jenis: UserJenis.Admin,
      nama_lengkap: 'Admin',
      nomor_hp: '+62 823-3333-7676',
      email: 'admin@gmail.com',
      kata_sandi: '123123',
    },
    {
      id: 5,
      jenis: UserJenis.Bengkel,
      nama_lengkap: 'Agus Santoso',
      nomor_hp: '+62 812-3456-7890',
      email: 'agus.santoso@example.com',
      kata_sandi: 'sandi1234',
    },
    {
      id: 6,
      jenis: UserJenis.Bengkel,
      nama_lengkap: 'Budi Hartono',
      nomor_hp: '+62 813-4567-8901',
      email: 'budi.hartono@example.com',
      kata_sandi: 'password5678',
    },
    {
      id: 7,
      jenis: UserJenis.Bengkel,
      nama_lengkap: 'Bengkel',
      nomor_hp: '+62 823-1321-9012',
      email: 'bengkel@gmail.com',
      kata_sandi: '123123',
    },
  ]
}

export function getFormattedUsers(users: User[], jenis: UserJenis): FormattedUser[] {
  return users
    .filter((user) => user.jenis === jenis)
    .map((user, index) => ({
      id: user.id,
      nomor: index + 1,
      jenis: user.jenis,
      nama_lengkap: user.nama_lengkap,
      nomor_hp: user.nomor_hp,
      email: user.email,
      kata_sandi: user.kata_sandi,
    }))
}

export function findUserById(users: User[], id: number): FormattedUser[] {
  return users
    .filter((user) => user.id === id)
    .map((user, index) => ({
      id: user.id,
      nomor: index + 1,
      jenis: user.jenis,
      nama_lengkap: user.nama_lengkap,
      nomor_hp: user.nomor_hp,
      email: user.email,
      kata_sandi: user.kata_sandi,
    }))
}
