/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Pengeluaran, FormattedPengeluaran, PengeluaranType } from '@/models/pengeluaran-model'
import { useLocalStorage } from '@vueuse/core'
import { parse } from 'date-fns'
import { defineStore } from 'pinia'
import { id } from 'date-fns/locale'
import { defaultPengeluaranForm } from '@/models/form'
import { pengeluaranActions } from '@/action/user/pengeluaran-action'
import { UserAction } from '@/models/user-model'
import { checkPengeluaranValidation } from '@/action/validation/check-validation'

export const usePengeluaranStore = defineStore('pengeluaran-store', {
  state: () => ({
    pengeluarans: useLocalStorage('pengeluarans', [] as Pengeluaran[]),
    formattedPengeluarans: [] as FormattedPengeluaran[],
    form: defaultPengeluaranForm,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async create(extraData?: any): Promise<void> {
      const { createPengeluaran } = pengeluaranActions()
      await createPengeluaran(this.form, extraData)
    },

    async update(extraData?: any): Promise<void> {
      const { updatePengeluaran } = pengeluaranActions()
      await updatePengeluaran(this.form, extraData)
    },

    async delete(): Promise<void> {
      const { deletePengeluaran } = pengeluaranActions()
      await deletePengeluaran(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkPengeluaranValidation(action, this.form)
    },

    // ~1~RESET
    resetForm(): void {
      const { resetForm } = pengeluaranActions()
      resetForm(this.form)
    },

    // ~1~SORT
    customKeySort() {
      return {
        nomor: (a: number, b: number) => {
          return a - b
        },
        mobil: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        tipe: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        keterangan: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        biaya: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        tanggal: (a: string, b: string) => {
          const formatString = 'EEEE, dd MMMM yyyy'
          const dateA = parse(a, formatString, new Date(), { locale: id })
          const dateB = parse(b, formatString, new Date(), { locale: id })
          return dateA.getTime() - dateB.getTime()
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const mobil = state.form.mobil.error
      const tipe = state.form.tipe.error
      const keterangan = state.form.keterangan.error
      const biaya = state.form.biaya.error
      const tanggal = state.form.tanggal.error
      return mobil === '' && tipe === '' && keterangan === '' && biaya === '' && tanggal === ''
    },

    getTipePengeluaran(): (tipe: string) => {
      text: string
      color: string
    } {
      return (tipe: string) => {
        if (tipe === PengeluaranType.BayarPengesup) {
          return { text: tipe, color: 'red' }
        } else if (tipe === PengeluaranType.BeliATK) {
          return { text: tipe, color: 'green' }
        } else if (tipe === PengeluaranType.BeliSparepart) {
          return { text: tipe, color: 'yellow' }
        } else if (tipe === PengeluaranType.GajiPegawai) {
          return { text: tipe, color: 'blue' }
        } else if (tipe === PengeluaranType.Mobil) {
          return { text: tipe, color: 'brown' }
        } else {
          return { text: tipe, color: 'default' }
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
          title: 'Mobil',
          value: 'mobil',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Tipe',
          value: 'tipe',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Keterangan',
          value: 'keterangan',
          sortable: true,
          nowrap: false,
          align: 'start',
        },
        {
          title: 'Biaya',
          value: 'biaya',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Tanggal',
          value: 'tanggal',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
      ]
    },
  },
})
