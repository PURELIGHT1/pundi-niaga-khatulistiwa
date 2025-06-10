/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormattedSparePart, SparePart, StatusSparePart } from '@/models/spare-part-model'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { defaultSparePartForm } from '@/models/form'
import { sparePartActions } from '@/action/user/spare-part-action'
import { UserAction } from '@/models/user-model'
import { checkSparePartValidation } from '@/action/validation/check-validation'

export const useSparePartStore = defineStore('spare-part-store', {
  state: () => ({
    spareParts: useLocalStorage('spare-parts', [] as SparePart[]),
    formattedSpareParts: [] as FormattedSparePart[],
    form: defaultSparePartForm,
    updateStatus: defaultSparePartForm.status_pembelian,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async create(extraData?: any): Promise<void> {
      const { createSparePart } = sparePartActions()
      await createSparePart(this.form, extraData)
    },

    async update(extraData?: any): Promise<void> {
      const { updateSparePart } = sparePartActions()
      await updateSparePart(this.form, extraData)
    },

    async updateStatus(extraData?: any): Promise<void> {
      const { updateStatusSparePart } = sparePartActions()
      await updateStatusSparePart(this.form, extraData)
    },

    async delete(): Promise<void> {
      const { deleteSparePart } = sparePartActions()
      await deleteSparePart(this.form)
    },

    async konfirmasi(): Promise<void> {
      const { konfirmasiSparePart } = sparePartActions()
      await konfirmasiSparePart(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkSparePartValidation(action, this.form)
    },

    // ~1~RESET

    resetForm() {
      const { resetForm } = sparePartActions()
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
        nama: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        harga: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        stok: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        status_pembelian: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const merek = state.form.merek.error
      const jenis = state.form.jenis.error
      const nama = state.form.nama.error
      const harga = state.form.harga.error
      const stok = state.form.stok.error
      const status_pembelian = state.form.status_pembelian.error
      return (
        merek === '' &&
        jenis === '' &&
        nama === '' &&
        harga === '' &&
        stok === '' &&
        status_pembelian === ''
      )
    },

    getStatusBayar(): (
      status: string,
      stok: string,
    ) => {
      text: string
      color: string
      icon: string
    } {
      return (status: string, stok: string) => {
        const stokNumber = Number(stok)
        if (status === StatusSparePart.SudahBeli && stokNumber === 0) {
          return { text: 'Stok Habis', color: 'red', icon: '$mdi-alert' }
        } else if (status === StatusSparePart.SudahBeli) {
          return { text: 'Sudah Beli', color: 'green', icon: '$mdi-checkbox' }
        } else if (status === StatusSparePart.BelumBeli) {
          return { text: 'Belum Beli', color: 'orange', icon: '$mdi-close' }
        } else {
          return { text: status, color: 'default', icon: '$mdi-help' }
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
          title: 'Nama',
          value: 'nama',
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
          title: 'Stok',
          value: 'stok',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Status Pembelian',
          value: 'status_pembelian',
          sortable: true,
          nowrap: true,
          align: 'center',
        },
      ]
    },
  },
})
