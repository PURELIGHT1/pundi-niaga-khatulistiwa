/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormattedMobil } from './mobil-model'
import { FormattedPendapatan } from './pendapatan-model'
import { FormattedPengeluaran } from './pengeluaran-model'
import { FormattedPKS } from './pks-model'
import { FormattedSopir } from './sopir-model'
import { FormattedSparePart } from './spare-part-model'
import { FormattedUser, UserJenis } from './user-model'
import { computed, ref } from 'vue'
import BerandaView from '@/views/BerandaView.vue'
import AdminView from '@/views/AdminView.vue'
import BengkelView from '@/views/BengkelView.vue'
import SopirView from '@/views/SopirView.vue'
import MobilView from '@/views/MobilView.vue'
import SparePartView from '@/views/SparePartView.vue'
// import PKSView from "@/views/PKSView.vue";
import PendapatanView from '@/views/PendapatanView.vue'
import PengeluaranView from '@/views/PengeluaranView.vue'
import RitaseView from '@/views/RitaseView.vue'
import MasukView from '@/views/MasukView.vue'
import { useNotifikasiStore } from '@/stores/notifikasi-store'
import { useUserStore } from '@/stores/user-store'
import { getAkunItems, TopBar } from './top-bar-model'
import UbahPasswordView from '@/views/UbahPasswordView.vue'

export const TRANSITION_DURATION = 1120
export const WORKER_ERROR_MESSAGE = 'Web Workers are not supported in this browser.'
export type DialogAction =
  | 'create'
  | 'update'
  | 'updateStatus'
  | 'delete'
  | 'konfirmasi'
  | 'updatePassword'

export interface Alert {
  id: number
  show: boolean
  type: 'error' | 'success' | 'warning' | 'info'
  title: string
  message: string
}

export interface Dialog {
  show: boolean
  item:
    | FormattedUser
    | FormattedSopir
    | FormattedMobil
    | FormattedSparePart
    | FormattedPendapatan
    | FormattedPengeluaran
    | FormattedPKS
  component: any
  props: any
}

const date = new Date()
export const MIN_YEAR = date.getFullYear() - 3

export const YEAR_OPTIONS = computed(() => {
  const currentYear = date.getFullYear()
  const startYear = MIN_YEAR
  const years = []
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year)
  }
  return years
})

export const MONTH_OPTIONS = computed(() => {
  const months: { title: string; value: number }[] = []
  for (let month = 0; month < 12; month++) {
    months.push({
      title: new Date(date.getFullYear(), month, 1).toLocaleDateString('id', {
        month: 'long',
      }),
      value: month,
    })
  }
  return months
})

export const ROUTES = [
  {
    path: '/beranda',
    name: 'Beranda',
    iconActive: '$home',
    iconPassive: '$home-outline',
    component: BerandaView,
    role: [UserJenis.Pemilik, UserJenis.Admin, UserJenis.Bengkel],
  },
  {
    path: '/admin',
    name: 'Admin',
    iconActive: '$account',
    iconPassive: '$account-outline',
    component: AdminView,
    role: [UserJenis.Pemilik],
  },
  {
    path: '/bengkel',
    name: 'Bengkel',
    iconActive: '$tools',
    iconPassive: '$hammer-wrench',
    component: BengkelView,
    role: [UserJenis.Pemilik],
  },
  {
    path: '/sopir',
    name: 'Sopir',
    iconActive: '$ship-wheel',
    iconPassive: '$steering',
    component: SopirView,
    role: [UserJenis.Pemilik, UserJenis.Admin],
  },
  {
    path: '/mobil',
    name: 'Mobil',
    iconActive: '$car',
    iconPassive: '$car-outline',
    component: MobilView,
    role: [UserJenis.Pemilik, UserJenis.Admin],
  },
  {
    path: '/spare-part',
    name: 'SparePart',
    iconActive: '$car-cog',
    iconPassive: '$car-battery',
    component: SparePartView,
    role: [UserJenis.Pemilik, UserJenis.Bengkel],
  },
  // {
  //   path: "/pks",
  //   name: "PKS",
  //   iconActive: "$oil-fill",
  //   iconPassive: "$oil",
  //   component: PKSView,
  //   role: [UserJenis.Pemilik, UserJenis.Admin],
  // },
  {
    path: '/pendapatan',
    name: 'Pendapatan',
    iconActive: '$cash-sync',
    iconPassive: '$cash-plus',
    component: PendapatanView,
    role: [UserJenis.Pemilik, UserJenis.Admin],
  },
  {
    path: '/pengeluaran',
    name: 'Pengeluaran',
    iconActive: '$cash-sync',
    iconPassive: '$cash-minus',
    component: PengeluaranView,
    role: [UserJenis.Pemilik, UserJenis.Admin],
  },
  {
    path: '/ritase',
    name: 'Ritase',
    iconActive: '$clipboard-text',
    iconPassive: '$clipboard-text-outline',
    component: RitaseView,
    role: [UserJenis.Pemilik, UserJenis.Admin],
  },
  {
    path: '/masuk',
    name: 'Masuk',
    iconActive: '$login',
    iconPassive: '$login-outline',
    component: MasukView,
    role: [UserJenis.Tamu],
  },
  {
    path: '/ubah-password',
    name: 'Ubah Password',
    iconActive: '$lock',
    iconPassive: '$lock-outline',
    component: UbahPasswordView,
    role: [UserJenis.Pemilik, UserJenis.Admin, UserJenis.Bengkel],
  },
]

export function getTopbar(userId: number, userStore: ReturnType<typeof useUserStore>): TopBar[] {
  const notifikasiStore = useNotifikasiStore()
  return [
    {
      key: 0,
      iconActive: '$bell-active',
      iconPassive: '$bell-passive',
      model: ref(false),
      width: '250px',
      type: 'notifikasi',
      data: ref(notifikasiStore.getNotifikasiByPenerima(userId).notifikasis || []),
      role: [UserJenis.Pemilik, UserJenis.Admin, UserJenis.Bengkel],
    },
    {
      key: 1,
      iconActive: '$account-active',
      iconPassive: '$account-passive',
      model: ref(false),
      width: '250px',
      type: 'akun',
      data: ref(getAkunItems(userStore)),
      role: [UserJenis.Pemilik, UserJenis.Admin, UserJenis.Bengkel],
    },
  ]
}
