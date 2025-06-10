import { ActionModel } from "@/models/action-model";
import { FormattedUser, User, UserForm, UserJenis } from "@/models/user-model";
import router from "@/plugins/router";
import { useAppStore } from "@/stores/app-store";
import { useLocalStorage } from "@vueuse/core";
import { checkUserValidation } from "../validation/check-validation";

export function userActions() {
  const appStore = useAppStore();
  const users = useLocalStorage<User[]>("users", []).value;
  const user = useLocalStorage<User>("user", {
    id: 0,
    jenis: UserJenis.Tamu,
    nama_lengkap: "",
    nomor_hp: "",
    email: "",
    kata_sandi: "",
  }).value;

  const login = async (form: UserForm) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;

    if (!(await checkUserValidation("login", form))) {
      appStore.loading = false;
      return;
    }

    const email = form.email.value;
    const kata_sandi = form.kata_sandi.value;
    const findUser = users.find(
      (u) => u.email === email && u.kata_sandi === kata_sandi,
    );

    if (!findUser) {
      appStore.loading = false;
      appStore.setAlerts(
        "error",
        "Autentikasi Gagal",
        "Email atau Password Salah",
      );
      return;
    }

    setUserLogin(findUser);

    afterAction(form);

    appStore.setAlerts(
      "success",
      "Autentikasi Berhasil",
      `Hai ${findUser.nama_lengkap} 👋`,
    );
  };

  const logout = async () => {
    if (!user || appStore.loading) {
      return;
    }

    appStore.loading = true;

    appStore.setAlerts(
      "success",
      "Keluar Berhasil",
      `Sampai Jumpa ${user.nama_lengkap} 👋`,
    );

    resetUser();
    router.push({ name: "Masuk" });
  };

  const createUser = async (
    jenis: UserJenis,
    form: UserForm,
    extraData?: ActionModel,
  ) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;
    if (!(await checkUserValidation(extraData?.action ?? "", form))) {
      appStore.loading = false;
      return;
    }

    const nama_lengkap = form.nama_lengkap.value;
    const nomor_hp = form.nomor_hp.value;
    const email = form.email.value;
    const kata_sandi = new Date().toLocaleString("id", {
      dateStyle: "short",
    });

    users.push({
      id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
      jenis: jenis,
      nama_lengkap: nama_lengkap,
      nomor_hp: `+62 ${nomor_hp}`,
      email: email.toLocaleLowerCase(),
      kata_sandi: kata_sandi,
    });

    afterAction(form);
    appStore.setAlerts(
      "success",
      "Aksi Berhasil",
      `Berhasil Tambah Data ${jenis}`,
    );
  };

  const updateUser = async (form: UserForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;

    if (!(await checkUserValidation(extraData?.action ?? "", form))) {
      appStore.loading = false;
      return;
    }

    const item = appStore.dialog.item as FormattedUser;
    const nama_lengkap = form.nama_lengkap.value;
    const nomor_hp = form.nomor_hp.value;
    const email = form.email.value;
    const kata_sandi = form.kata_sandi.value;

    const index = users.findIndex((user) => user.id === item.id);
    if (index !== -1) {
      users[index].nama_lengkap = nama_lengkap;
      users[index].nomor_hp = `+62 ${nomor_hp}`;
      users[index].email = email.toLocaleLowerCase();
      users[index].kata_sandi = kata_sandi;
    }

    afterAction(form);
    appStore.setAlerts(
      "success",
      "Aksi Berhasil",
      `Berhasil Ubah Data ${item.jenis}`,
    );
  };

  const deleteUser = async (form: UserForm) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;
    const item = appStore.dialog.item as FormattedUser;
    const index = users.findIndex((user) => user.id === item.id);

    if (index !== -1) {
      users.splice(index, 1);
    }

    afterAction(form);
    appStore.setAlerts(
      "success",
      "Aksi Berhasil",
      `Berhasil Hapus Data ${item.jenis}`,
    );
  };

  const updatePassword = async (form: UserForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;
    if (!(await checkUserValidation(extraData?.action ?? "", form))) {
      appStore.loading = false;
      return;
    }
    const kata_sandi = form.kata_sandi.value;

    const index = users.findIndex((user) => user.id === appStore.user.id);
    if (index !== -1) {
      user.kata_sandi = kata_sandi;
      users[index].kata_sandi = kata_sandi;
    }

    afterAction(form);
    appStore.setAlerts("success", "Aksi Berhasil", `Berhasil Ubah Password`);
    router.push({ name: "Beranda" });
  };

  const afterAction = (form: UserForm) => {
    resetForm(form);
    appStore.resetDialog();
  };

  const setUserLogin = (userUpdate: User) => {
    user.id = userUpdate.id;
    user.jenis = userUpdate.jenis;
    user.nama_lengkap = userUpdate.nama_lengkap;
    user.nomor_hp = userUpdate.nomor_hp;
    user.email = userUpdate.email;
    user.kata_sandi = userUpdate.kata_sandi;
  };

  const resetForm = (form: UserForm) => {
    form.nama_lengkap.value = "";
    form.nama_lengkap.error = "";

    form.nomor_hp.value = "";
    form.nomor_hp.digit = "";
    form.nomor_hp.error = "";

    form.email.value = "";
    form.email.error = "";

    form.kata_sandi.value = "";
    form.kata_sandi.error = "";
  };

  const resetUser = () => {
    user.id = 0;
    user.jenis = UserJenis.Tamu;
    user.nama_lengkap = "";
    user.nomor_hp = "";
    user.email = "";
    user.kata_sandi = "";
  };

  return {
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
    resetForm,
  };
}
