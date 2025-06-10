/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormattedSopir, Sopir } from '@/models/sopir-model'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { defaultSopirForm } from '@/models/form'
import { sopirActions } from '@/action/user/sopir-action'
import { UserAction } from '@/models/user-model'
import { checkSopirValidation } from '@/action/validation/check-validation'

export const useSopirStore = defineStore('sopir-store', {
  state: () => ({
    sopirs: useLocalStorage('sopirs', [] as Sopir[]),
    formattedSopirs: [] as FormattedSopir[],
    form: defaultSopirForm,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async create(extraData?: any): Promise<void> {
      const { createSopir } = sopirActions()
      await createSopir(this.form, extraData)
    },

    async update(extraData?: any): Promise<void> {
      const { updateSopir } = sopirActions()
      await updateSopir(this.form, extraData)
    },

    async delete(): Promise<void> {
      const { deleteSopir } = sopirActions()
      await deleteSopir(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkSopirValidation(action, this.form)
    },

    resetForm() {
      const { resetForm } = sopirActions()
      resetForm(this.form)
    },

    // ~1~SORT
    customKeySort() {
      return {
        nomor: (a: number, b: number) => {
          return a - b
        },
        nama_lengkap: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        nomor_hp: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        nomor_sim: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        asal_pks: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        tujuan_pks: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        uang_minyak: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        jumlah_pendapatan: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        jumlah_pengiriman: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const nama_lengkap = state.form.nama_lengkap.error
      const nomor_hp = state.form.nomor_hp.error
      const nomor_sim = state.form.nomor_sim.error
      const asal_pks = state.form.asal_pks.error
      const tujuan_pks = state.form.tujuan_pks.error
      const uang_minyak = state.form.uang_minyak.error
      return (
        nama_lengkap === '' &&
        nomor_hp === '' &&
        nomor_sim === '' &&
        asal_pks === '' &&
        tujuan_pks === '' &&
        uang_minyak === ''
      )
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
          title: 'Nama Lengkap',
          value: 'nama_lengkap',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Nomor HP',
          value: 'nomor_hp',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Nomor SIM',
          value: 'nomor_sim',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Asal PKS',
          value: 'asal_pks',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Tujuan PKS',
          value: 'tujuan_pks',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Uang Minyak',
          value: 'uang_minyak',
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
          title: 'Jumlah Pengiriman',
          value: 'jumlah_pengiriman',
          sortable: true,
          nowrap: true,
          align: 'center',
        },
      ]
    },
  },
})
