/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormattedUser, User, UserAction, UserJenis } from '@/models/user-model'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import router from '@/plugins/router'
import { defaultUserForm } from '@/models/form'
import { userActions } from '@/action/user/user-action'
import { checkUserValidation } from '@/action/validation/check-validation'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: useLocalStorage('user', {
      id: 0,
      jenis: UserJenis.Tamu,
      nama_lengkap: '',
      nomor_hp: '',
      email: '',
      kata_sandi: '',
    } as User),
    users: useLocalStorage('users', [] as User[]),
    formattedUsers: [] as FormattedUser[],
    form: defaultUserForm,
    search: '' as string,
  }),

  actions: {
    // ~1~ACTION
    async login() {
      const { login } = userActions()
      await login(this.form)

      router.push({ name: 'Beranda' })
    },

    async logout() {
      const { logout } = userActions()
      await logout()
    },

    async create(jenis: UserJenis, extraData?: any) {
      const { createUser } = userActions()
      await createUser(jenis, this.form, extraData)
    },

    async update(extraData?: any) {
      const { updateUser } = userActions()
      await updateUser(this.form, extraData)
    },

    async delete() {
      const { deleteUser } = userActions()
      await deleteUser(this.form)
    },

    async updatePassword() {
      const { updatePassword } = userActions()
      await updatePassword(this.form)
    },

    // ~1~OTHER
    async checkValidation(action: UserAction): Promise<boolean> {
      return await checkUserValidation(action, this.form)
    },

    resetForm() {
      const { resetForm } = userActions()
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
        email: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
        kata_sandi: (a: string, b: string) => {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        },
      }
    },
  },

  getters: {
    isValidationValid(state): boolean {
      const nama_lengkap = state.form.nama_lengkap.error
      const nomor_hp = state.form.nomor_hp.error
      const email = state.form.email.error
      const kata_sandi = state.form.kata_sandi.error
      return nama_lengkap === '' && nomor_hp === '' && email === '' && kata_sandi === ''
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
          title: 'Email',
          value: 'email',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
        {
          title: 'Kata Sandi',
          value: 'kata_sandi',
          sortable: true,
          nowrap: true,
          align: 'start',
        },
      ]
    },
  },
})
