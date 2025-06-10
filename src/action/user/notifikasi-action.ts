import { useAppStore } from "@/stores/app-store";
import { useLocalStorage } from "@vueuse/core";
import { Notifikasi, NotifikasiForm } from "@/models/notifikasi-model";
import { formatWaktuRelative } from "@/utils/util";
import { User } from "@/models/user-model";

export function notifikasiActions() {
  const appStore = useAppStore();
  const notifikasis = useLocalStorage<Notifikasi[]>("notifikasi", []).value;

  const setStatusBaca = async (id: number) => {
    if (appStore.loading) {
      return;
    }
    const index = notifikasis.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifikasis[index].status_baca = true;
    }
    appStore.setAlerts(
      "success",
      "Aksi Berhasil",
      "Berhasil Melihat Notifikasi",
    );
  };

  const createNotifikasi = async (form: NotifikasiForm) => {
    const pesan = form.pesan.value;
    const tanggal = form.tanggal.value as Date;
    const user_penerima = form.user_penerima.value as User;
    const path = form.path.value;

    notifikasis.push({
      id:
        notifikasis.length === 0
          ? 1
          : notifikasis[notifikasis.length - 1].id + 1,
      pesan: pesan,
      tanggal: tanggal,
      convert_tanggal: formatWaktuRelative(tanggal),
      status_baca: false,
      id_user_pengirim: appStore.user.id,
      nama_lengkap_pengirim: appStore.user.nama_lengkap,
      id_user_penerima: user_penerima.id,
      nama_lengkap_penerima: user_penerima.nama_lengkap,
      path: path,
    });

    afterAction(form);
  };

  const afterAction = (form: NotifikasiForm) => {
    resetForm(form);
    appStore.resetDialog();
  };

  const resetForm = (form: NotifikasiForm) => {
    form.pesan.value = "";
    form.pesan.error = "";

    form.tanggal.value = null;
    form.tanggal.error = "";

    form.status_baca.value = false;
    form.status_baca.error = "";

    form.user_pengirim.value = null;
    form.user_pengirim.error = "";

    form.user_penerima.value = null;
    form.user_penerima.error = "";

    form.path.value = null;
    form.path.error = "";
  };
  return {
    setStatusBaca,
    createNotifikasi,
    resetForm,
  };
}
