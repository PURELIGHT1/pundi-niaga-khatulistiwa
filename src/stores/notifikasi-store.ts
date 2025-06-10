 

import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { defaultNotifikasiForm } from '@/models/form'
import { FormattedNotifikasi, Notifikasi } from '@/models/notifikasi-model'
import { notifikasiActions } from '@/action/user/notifikasi-action'

export const useNotifikasiStore = defineStore('notifikasi-store', {
  state: () => ({
    notifikasis: useLocalStorage('notifikasi', [] as Notifikasi[]),
    formattedNotifikasis: [] as FormattedNotifikasi[],
    form: defaultNotifikasiForm,
  }),

  actions: {
    async readNotifikasi(id: number): Promise<void> {
      const { setStatusBaca } = notifikasiActions()
      await setStatusBaca(id)
    },
    async createNotifikasi(): Promise<void> {
      const { createNotifikasi } = notifikasiActions()
      await createNotifikasi(this.form)
    },
  },

  getters: {
    getNotifikasiByPenerima(): (id_user: number) => {
      notifikasis: Notifikasi[]
    } {
      return (id_user: number) => {
        const found = this.notifikasis.filter(
          (notifikasi) => notifikasi.id_user_penerima === id_user,
        )
        return { notifikasis: found }
      }
    },

    countUnreadNotifikasi(): (id_user: number) => { count: number } {
      return (id_user: number) => {
        const count = this.notifikasis.filter(
          (notifikasi) => notifikasi.id_user_penerima === id_user && !notifikasi.status_baca,
        ).length
        return { count: count }
      }
    },
  },
})
