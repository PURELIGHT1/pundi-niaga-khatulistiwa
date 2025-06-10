/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormattedPKS, PKS } from '@/models/pks-model'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { defaultPKSForm } from '@/models/form'
import { pksActions } from '@/action/user/pks-action'
import { UserAction } from '@/models/user-model'
import { checkPKSValidation } from '@/action/validation/check-validation'

export const usePKSStore = defineStore('pks-store', {
  state: () => ({
    pks: useLocalStorage('pks', [] as PKS[]),
    formattedPKSes: [] as FormattedPKS[],
    form: defaultPKSForm,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async create(extraData?: any): Promise<void> {
      const { createPKS } = pksActions()
      await createPKS(this.form, extraData)
    },

    async update(extraData?: any): Promise<void> {
      const { updatePKS } = pksActions()
      await updatePKS(this.form, extraData)
    },

    async delete(): Promise<void> {
      const { deletePKS } = pksActions()
      await deletePKS(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkPKSValidation(action, this.form)
    },

    // ~1~RESET

    resetForm() {
      const { resetForm } = pksActions()
      resetForm(this.form)
    },

    // ~1~SORT
    customKeySort() {
      return {
        nomor: (a: number, b: number) => {
          return a - b
        },
        nama: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        is_active: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const nama = state.form.nama.error
      return nama === ''
    },

    getStatusPKS(): (status: boolean) => {
      text: string
      color: string
    } {
      return (status: boolean) => {
        if (status === true) {
          return { text: 'Aktif', color: 'green' }
        } else {
          return { text: 'Non-Aktif', color: 'red' }
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
          align: 'start',
        },
        {
          title: 'PKS',
          value: 'nama',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Status',
          value: 'is_active',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
      ]
    },
  },
})
