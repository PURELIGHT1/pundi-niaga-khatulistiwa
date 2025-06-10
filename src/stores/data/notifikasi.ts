import { FormattedNotifikasi, Notifikasi } from '@/models/notifikasi-model'
import { useUserStore } from '../user-store'
import { formatWaktuRelative, randomNumber } from '@/utils/util'
import { User } from '@/models/user-model'
import { useAppStore } from '../app-store'

const notifs = [
  {
    message: 'Servis selesai untuk mobil Toyota Avanza',
    path: '/mobil',
  },
  {
    message: 'Pengingat pembayaran bulan ini',
    path: '/pendapatan',
  },
  {
    message: 'Akun Anda berhasil diperbarui',
    path: '/admin',
  },
  {
    message: 'Jadwal servis telah dikonfirmasi',
    path: null,
  },
  {
    message: 'Notifikasi baru dari admin',
    path: '/pks',
  },
]

function randomDateInPastWeek(): Date {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 7) // 0 - 6 hari lalu
  const randomHours = Math.floor(Math.random() * 24)
  const randomMinutes = Math.floor(Math.random() * 60)

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysAgo,
    randomHours,
    randomMinutes,
  )
}

export function initializeNotifikasis(): Notifikasi[] {
  const userStore = useUserStore()
  const pemilik = userStore.users.find((u) => u.jenis === 'Pemilik')

  if (userStore.users.length <= 1) {
    return []
  }
  const result: Notifikasi[] = []
  let i = 0
  const targetLength = notifs.length

  while (i < targetLength) {
    const pengirim = userStore.users[randomNumber(0, userStore.users.length - 1)]

    const tanggal = randomDateInPastWeek()
    const notif = notifs[randomNumber(0, notifs.length - 1)]

    result.push({
      id: i + 1,
      pesan: notif.message,
      tanggal: tanggal,
      status_baca: false,
      id_user_pengirim: pengirim.id,
      nama_lengkap_pengirim: pengirim.nama_lengkap,
      id_user_penerima: pemilik ? pemilik.id : 0,
      nama_lengkap_penerima: pemilik ? pemilik.nama_lengkap : '',
      path: notif.path,
      convert_tanggal: formatWaktuRelative(tanggal),
    })

    i++
  }

  return result
}

export function getFormattedNotifikasis(notifikasis: Notifikasi[]): FormattedNotifikasi[] {
  const appStore = useAppStore()
  const userStore = useUserStore()

  return notifikasis
    .filter((notifikasi) => appStore.user.id === notifikasi.id_user_penerima)
    .map((notifikasi, index) => {
      const userPenerima = userStore.users.find(
        (user) => user.id === notifikasi.id_user_penerima,
      ) as User

      const userPengirim = userStore.users.find(
        (user) => user.id === notifikasi.id_user_pengirim,
      ) as User

      const tanggal = new Date(notifikasi.tanggal).toLocaleDateString('id', {
        dateStyle: 'full',
      })

      return {
        id: notifikasi.id,
        nomor: index + 1,
        pesan: notifikasi.pesan,
        tanggal: tanggal,
        status_baca: notifikasi.status_baca,
        id_user_pengirim: userPengirim.id,
        nama_lengkap_pengirim: userPengirim.nama_lengkap,
        id_user_penerima: userPenerima.id,
        nama_lengkap_penerima: userPenerima.nama_lengkap,
        path: notifikasi.path,
      }
    })
}
