import { UserForm } from '../user-model'

export const defaultUserForm: UserForm = {
  nama_lengkap: {
    value: '',
    error: '',
  },
  nomor_hp: {
    value: '',
    digit: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  kata_sandi: {
    value: '',
    error: '',
  },
}
