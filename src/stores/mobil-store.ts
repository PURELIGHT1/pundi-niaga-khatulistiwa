/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Mobil, type FormattedMobil, MobilWarna } from '@/models/mobil-model'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { parse } from 'date-fns'
import { id } from 'date-fns/locale'
import { checkMobilValidation } from '@/action/validation/check-validation'
import { UserAction } from '@/models/user-model'
import { mobilActions } from '@/action/user/mobil-action'
import { defaultMobilForm } from '@/models/form'

export const useMobilStore = defineStore('mobil-store', {
  state: () => ({
    mobils: useLocalStorage('mobils', [] as Mobil[]),
    formattedMobils: [] as FormattedMobil[],
    form: defaultMobilForm,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async create(extraData?: any): Promise<void> {
      const { createMobil } = mobilActions()
      await createMobil(this.form, extraData)
    },

    async update(extraData?: any): Promise<void> {
      const { updateMobil } = mobilActions()
      await updateMobil(this.form, extraData)
    },

    async delete(): Promise<void> {
      const { deleteMobil } = mobilActions()
      await deleteMobil(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkMobilValidation(action, this.form)
    },

    // ~1~RESET

    resetForm() {
      const { resetForm } = mobilActions()
      resetForm(this.form)
    },

    // ~1~SORT
    customKeySort() {
      return {
        nomor: (a: number, b: number) => {
          return a - b
        },
        merek: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        jenis: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        nomor_polisi: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        nama: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        jenis_bbm: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        warna: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        harga: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        biaya_pajak: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        jatuh_tempo_pajak: (a: string, b: string) => {
          const formatString = 'EEEE, dd MMMM yyyy'
          const dateA = parse(a, formatString, new Date(), { locale: id })
          const dateB = parse(b, formatString, new Date(), { locale: id })
          return dateA.getTime() - dateB.getTime()
        },
        jumlah_pendapatan: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        jumlah_pengeluaran: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        jumlah_penggunaan: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const merek = state.form.merek.error
      const jenis = state.form.jenis.error
      const nomor_polisi = state.form.nomor_polisi.error
      const nama = state.form.nama.error
      const jenis_bbm = state.form.jenis_bbm.error
      const warna = state.form.warna.error
      const harga = state.form.harga.error
      const biaya_pajak = state.form.biaya_pajak.error
      const jatuh_tempo_pajak = state.form.jatuh_tempo_pajak.error

      return (
        merek === '' &&
        jenis === '' &&
        nomor_polisi === '' &&
        nama === '' &&
        jenis_bbm === '' &&
        warna === '' &&
        harga === '' &&
        biaya_pajak === '' &&
        jatuh_tempo_pajak === ''
      )
    },
    getWarnaMobil(): (warna: string) => {
      text: string
      color: string
    } {
      return (warna: string) => {
        const found = MobilWarna.find((w) => w.value === warna)
        return {
          text: warna,
          color: found?.color ?? 'default',
        }
      }
    },
    getTableHeaders(): any {
      return [
        {
          title: 'Opsi',
          value: 'opsi',
          sortable: false,
          nowrap: true,
          align: 'center',
        },
        {
          title: 'Nomor',
          value: 'nomor',
          sortable: true,
          nowrap: true,
          align: 'center',
        },
        {
          title: 'Merek',
          value: 'merek',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Jenis',
          value: 'jenis',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Nomor Polisi',
          value: 'nomor_polisi',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Nama',
          value: 'nama',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Jenis BBM',
          value: 'jenis_bbm',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Warna',
          value: 'warna',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Harga',
          value: 'harga',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Biaya Pajak',
          value: 'biaya_pajak',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Jatuh Tempo Pajak',
          value: 'jatuh_tempo_pajak',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Jumlah Pendapatan',
          value: 'jumlah_pendapatan',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Jumlah Pengeluaran',
          value: 'jumlah_pengeluaran',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Jumlah Penggunaan',
          value: 'jumlah_penggunaan',
          sortable: true,
          nowrap: true,
          align: 'center',
        },
      ]
    },
  },
})
