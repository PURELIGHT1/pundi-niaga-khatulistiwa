/* eslint-disable @typescript-eslint/no-explicit-any */

import { Alert, Dialog, DialogAction } from '@/models/app-model'
import router from '@/plugins/router'
import { defineStore } from 'pinia'
import { shallowRef, nextTick } from 'vue'
import { useSopirStore } from './sopir-store'
import { usePendapatanStore } from './pendapatan-store'
import { useMobilStore } from './mobil-store'
import { useUserStore } from './user-store'
import { User, UserJenis } from '@/models/user-model'
import { useNotifikasiStore } from './notifikasi-store'
import { Mobil } from '@/models/mobil-model'

export const useAppStore = defineStore('app-store', {
  state: () => ({
    active: {
      parent: false,
      child: false,
    },
    loading: false as boolean,
    alerts: [] as Alert[],
    dialog: {} as Dialog,
  }),

  actions: {
    // ~1~ACTION
    async sendNotif(mobil: Mobil): Promise<void> {
      if (!mobil.send_notif) {
        const notifikasiStore = useNotifikasiStore()
        const userStore = useUserStore()

        const pesanNotif = `Pajak mobil dengan nomor ID ${mobil.id} jatuh tempo hari ini. Mohon segera melakukan pembayaran.`

        const pemilik = userStore.users.find((u) => u.jenis === UserJenis.Pemilik) ?? null

        notifikasiStore.form = {
          ...notifikasiStore.form,
          pesan: {
            value: pesanNotif,
            error: '',
          },
          tanggal: {
            value: new Date(),
            error: '',
          },
          status_baca: {
            value: false,
            error: '',
          },
          user_pengirim: {
            value: userStore.user,
            error: '',
          },
          user_penerima: {
            value: pemilik,
            error: '',
          },
          path: {
            value: '/mobil',
            error: '',
          },
        }

        await notifikasiStore.createNotifikasi()
      }
    },

    async synchronize(): Promise<void> {
      const sopirStore = useSopirStore()
      const mobilStore = useMobilStore()
      const pendapatanStore = usePendapatanStore()
      // const pengeluaranStore = usePengeluaranStore();

      const aktifPendapatans = pendapatanStore.pendapatans.filter((p) => p.is_active === true)

      const pendapatanMap = aktifPendapatans.reduce(
        (accumulator, pendapatan) => {
          if (!accumulator.sopir[pendapatan.id_sopir]) {
            accumulator.sopir[pendapatan.id_sopir] = {
              jumlah_pendapatan: 0,
              jumlah_pengiriman: 0,
            }
          }

          if (!accumulator.mobil[pendapatan.id_mobil]) {
            accumulator.mobil[pendapatan.id_mobil] = {
              jumlah_pendapatan: 0,
              jumlah_penggunaan: 0,
            }
          }

          accumulator.sopir[pendapatan.id_sopir].jumlah_pendapatan += Math.round(
            pendapatan.pendapatan_bruto,
          )
          accumulator.sopir[pendapatan.id_sopir].jumlah_pengiriman++

          accumulator.mobil[pendapatan.id_mobil].jumlah_pendapatan += Math.round(
            pendapatan.pendapatan_bruto,
          )
          accumulator.mobil[pendapatan.id_mobil].jumlah_penggunaan++

          return accumulator
        },
        {
          sopir: {} as {
            [key: number]: {
              jumlah_pendapatan: number
              jumlah_pengiriman: number
            }
          },
          mobil: {} as {
            [key: number]: {
              jumlah_pendapatan: number
              jumlah_penggunaan: number
            }
          },
        },
      )

      sopirStore.sopirs.forEach((sopir) => {
        const data = pendapatanMap.sopir[sopir.id]
        if (data) {
          sopir.jumlah_pendapatan = data.jumlah_pendapatan
          sopir.jumlah_pengiriman = data.jumlah_pengiriman
        } else {
          sopir.jumlah_pendapatan = 0
          sopir.jumlah_pengiriman = 0
        }
      })

      mobilStore.mobils.forEach((mobil) => {
        const pendapatanData = pendapatanMap.mobil[mobil.id]
        // const pengeluaranData = pengeluaranMap.mobil[mobil.id];

        if (pendapatanData) {
          mobil.jumlah_pendapatan = pendapatanData.jumlah_pendapatan
          mobil.jumlah_penggunaan = pendapatanData.jumlah_penggunaan
        } else {
          mobil.jumlah_pendapatan = 0
          mobil.jumlah_penggunaan = 0
        }

        const jatuhTempo = new Date(mobil.jatuh_tempo_pajak)
        const duaMingguSebelum = new Date(jatuhTempo)
        duaMingguSebelum.setDate(jatuhTempo.getDate() - 14)

        const duaMingguSetelah = new Date(jatuhTempo)
        duaMingguSetelah.setDate(jatuhTempo.getDate() + 14)

        let status_pajak: 'secure' | 'warning' | null = null

        const currentDate: Date = new Date()
        const timecurrentDate = currentDate.getTime()
        const timeDuaMingguSebelum = duaMingguSebelum.getTime()
        const timejatuhTempo = jatuhTempo.getTime()
        if (
          timecurrentDate >= timeDuaMingguSebelum &&
          timecurrentDate <= timejatuhTempo &&
          mobil.status_bayar_pajak === false
        ) {
          status_pajak = 'warning'
        } else if (mobil.status_bayar_pajak === true) {
          status_pajak = 'secure'
        } else {
          status_pajak = 'warning'
        }

        const isSameDate =
          currentDate.getDate() === jatuhTempo.getDate() &&
          currentDate.getMonth() === jatuhTempo.getMonth() &&
          currentDate.getFullYear() === jatuhTempo.getFullYear() &&
          mobil.status_pajak === 'warning'
        if (isSameDate) {
          this.sendNotif(mobil)
          mobil.send_notif = true
        }

        mobil.status_pajak = status_pajak
      })
    },
    // ~1~GETTER & SETTER
    setAlerts(
      type: 'error' | 'success' | 'warning' | 'info',
      title: string,
      message: string,
    ): void {
      this.alerts.push({
        id: new Date().getTime(),
        show: true,
        type: type,
        title: title,
        message: message,
      })

      window.setTimeout(
        () => {
          if (this.alerts.length > 0) {
            this.alerts.shift()
          }
        },
        1500 + 560 * this.alerts.length,
      )
    },

    setDialog(item: any, component: any, action: DialogAction): void {
      this.dialog = {
        show: true,
        item: item,
        component: shallowRef(component),
        props: {
          action: action,
        },
      }
    },

    resetDialog(): void {
      this.dialog.show = false
      this.loading = false

      window.setTimeout(() => {
        nextTick(() => {
          this.dialog = {} as Dialog
        })
      }, 280)
    },
  },

  getters: {
    getCurrentPath(): string {
      return router.currentRoute.value.path
    },

    user(): User {
      const user: User = {
        id: 0,
        jenis: UserJenis.Tamu,
        nama_lengkap: '',
        nomor_hp: '',
        email: '',
        kata_sandi: '',
      }
      const userStore = useUserStore()
      return userStore.user.jenis != UserJenis.Tamu ? userStore.user : user
    },
  },
})
