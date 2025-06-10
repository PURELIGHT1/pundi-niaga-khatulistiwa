/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pendapatan, FormattedPendapatan, DeletePendapatan } from '@/models/pendapatan-model'
import { useLocalStorage } from '@vueuse/core'
import { parse } from 'date-fns'
import { defineStore } from 'pinia'
import { id } from 'date-fns/locale'
import { defaultPendapatanForm } from '@/models/form'
import { checkPendapatanValidation } from '@/action/validation/check-validation'
import { UserAction } from '@/models/user-model'
import { pendapatanActions } from '@/action/user/pendapatan-action'

export const usePendapatanStore = defineStore('pendapatan-store', {
  state: () => ({
    pendapatans: useLocalStorage('pendapatans', [] as Pendapatan[]),
    formattedPendapatans: [] as FormattedPendapatan[],
    form: defaultPendapatanForm,
    validateDelete: {
      response: {
        value: true,
        error: null,
      },
    } as DeletePendapatan,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async create(extraData?: any): Promise<void> {
      const { createPendapatan } = pendapatanActions()
      await createPendapatan(this.form, extraData)
    },

    async update(extraData?: any): Promise<void> {
      const { updatePendapatan } = pendapatanActions()
      await updatePendapatan(this.form, extraData)
    },

    async delete(extraData?: any): Promise<void> {
      const { deletePendapatan } = pendapatanActions()
      await deletePendapatan(this.form, extraData)
    },

    async konfirmasi(): Promise<void> {
      const { konfirmasiPendapatan } = pendapatanActions()
      await konfirmasiPendapatan(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkPendapatanValidation(action, this.form)
    },

    // ~1~RESET
    resetForm() {
      const { resetForm } = pendapatanActions()
      resetForm(this.form)
    },

    // ~1~SORT
    customKeySort() {
      return {
        sopir: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        mobil: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        spk: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        tanggal_muat: (a: string, b: string) => {
          const formatString = 'EEEE, dd MMMM yyyy'
          const dateA = parse(a, formatString, new Date(), { locale: id })
          const dateB = parse(b, formatString, new Date(), { locale: id })
          return dateA.getTime() - dateB.getTime()
        },
        tanggal_bongkar: (a: string, b: string) => {
          const formatString = 'EEEE, dd MMMM yyyy'
          const dateA = parse(a, formatString, new Date(), { locale: id })
          const dateB = parse(b, formatString, new Date(), { locale: id })
          return dateA.getTime() - dateB.getTime()
        },
        timbangan_muat: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        timbangan_bongkar: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        selisih_berat: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        persen_susut: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        ongkos_angkut: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        harga_klaim_susut: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        sub_total: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        ppn: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        pph: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        klaim_susut: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
        pendapatan_bruto: (a: string, b: string) => {
          const numberA = Number(a.replace(/[^\d|-]+/g, ''))
          const numberB = Number(b.replace(/[^\d|-]+/g, ''))
          return numberA - numberB
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const sopir = state.form.sopir.error
      const mobil = state.form.mobil.error
      const spk = state.form.spk.error
      const tanggal_muat = state.form.tanggal_muat.error
      const tanggal_bongkar = state.form.tanggal_bongkar.error
      const timbangan_muat = state.form.timbangan_muat.error
      const timbangan_bongkar = state.form.timbangan_bongkar.error
      const ongkos_angkut = state.form.ongkos_angkut.error
      const harga_klaim_susut = state.form.harga_klaim_susut.error

      return (
        spk === '' &&
        sopir === '' &&
        mobil === '' &&
        tanggal_muat === '' &&
        tanggal_bongkar === '' &&
        timbangan_muat === '' &&
        timbangan_bongkar === '' &&
        ongkos_angkut === '' &&
        harga_klaim_susut === ''
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
          value: 'id',
          sortable: true,
          nowrap: true,
          align: 'center',
        },
        {
          title: 'Sopir',
          value: 'sopir',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Mobil',
          value: 'mobil',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'SPK',
          value: 'spk',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Tanggal Muat',
          value: 'tanggal_muat',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Tanggal Bongkar',
          value: 'tanggal_bongkar',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Timbangan Muat (Kg)',
          value: 'timbangan_muat',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Timbangan Bongkar (Kg)',
          value: 'timbangan_bongkar',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Selisih Berat (Kg)',
          value: 'selisih_berat',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: '%',
          value: 'persen_susut',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Ongkos Angkut',
          value: 'ongkos_angkut',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Harga Klaim Susut',
          value: 'harga_klaim_susut',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Sub Total',
          value: 'sub_total',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'PPN 11%',
          value: 'ppn',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'PPH 23 (2%)',
          value: 'pph',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Klaim Susut',
          value: 'klaim_susut',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Pendapatan Bruto',
          value: 'pendapatan_bruto',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
      ]
    },
  },
})
