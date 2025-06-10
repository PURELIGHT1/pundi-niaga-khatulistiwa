import type { Ref } from 'vue'
import { Notifikasi } from './notifikasi-model'
import { UserJenis } from './user-model'
import { useUserStore } from '@/stores/user-store'
import router from '@/plugins/router'

export interface Akun {
  title: string
  onClick: (() => void) | null
}

export type TopBar =
  | {
      key: number
      iconActive: string
      iconPassive: string
      model: Ref<boolean>
      type: 'notifikasi'
      width: string
      data: Ref<Notifikasi[]>
      role: UserJenis[]
    }
  | {
      key: number
      iconActive: string
      iconPassive: string
      model: Ref<boolean>
      type: 'akun'
      width: string
      data: Ref<Akun[]>
      role: UserJenis[]
    }

export function getAkunItems(userStore: ReturnType<typeof useUserStore>): Akun[] {
  return [
    { title: 'Ubah Password', onClick: () => router.push('/ubah-password') },
    { title: 'Logout', onClick: () => userStore.logout() },
  ]
}
