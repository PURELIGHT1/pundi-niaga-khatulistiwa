import { ActionModel } from "@/models/action-model";
import { useAppStore } from "@/stores/app-store";
import { useLocalStorage } from "@vueuse/core";
import {
  FormattedMobil,
  Mobil,
  MobilForm,
  MobilJenisBBM,
} from "@/models/mobil-model";
import { checkMobilValidation } from "../validation/check-validation";

export function mobilActions() {
  const appStore = useAppStore();
  const mobils = useLocalStorage<Mobil[]>("mobils", []).value;

  const createMobil = async (form: MobilForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;
    if (!(await checkMobilValidation(extraData?.action ?? "", form))) {
      appStore.loading = false;
      return;
    }

    const merek = form.merek.value;
    const jenis = form.jenis.value;
    const nomor_polisi = form.nomor_polisi.value;
    const nama = form.nama.value;
    const jenis_bbm = form.jenis_bbm.value as MobilJenisBBM;
    const warna = form.warna.value;
    const harga = form.harga.digit;
    const biaya_pajak = form.biaya_pajak.digit;
    const jatuh_tempo_pajak = form.jatuh_tempo_pajak.value as Date;

    mobils.push({
      id: mobils.length === 0 ? 1 : mobils[mobils.length - 1].id + 1,
      merek: merek,
      jenis: jenis,
      nomor_polisi: nomor_polisi,
      nama: nama,
      jenis_bbm: jenis_bbm,
      warna: warna,
      harga: Number(harga),
      biaya_pajak: Number(biaya_pajak),
      jatuh_tempo_pajak: jatuh_tempo_pajak,
      jumlah_pendapatan: 0,
      jumlah_pengeluaran: 0,
      jumlah_penggunaan: 0,
      status_bayar_pajak: true,
      status_pajak: null,
      send_notif: false,
    });

    afterAction(form);
    appStore.setAlerts(
      "success",
      "Aksi Berhasil",
      "Berhasil Tambah Data Mobil",
    );
  };

  const updateMobil = async (form: MobilForm, extraData?: ActionModel) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;
    if (!(await checkMobilValidation(extraData?.action ?? "", form))) {
      appStore.loading = false;
      return;
    }

    const item = appStore.dialog.item as FormattedMobil;
    const merek = form.merek.value;
    const jenis = form.jenis.value;
    const nomor_polisi = form.nomor_polisi.value;
    const nama = form.nama.value;
    const jenis_bbm = form.jenis_bbm.value as MobilJenisBBM;
    const warna = form.warna.value;
    const harga = form.harga.digit;
    const biaya_pajak = form.biaya_pajak.digit;
    const jatuh_tempo_pajak = form.jatuh_tempo_pajak.value as Date;

    const index = mobils.findIndex((mobil) => mobil.id === item.id);
    if (index !== -1) {
      mobils[index].merek = merek;
      mobils[index].jenis = jenis;
      mobils[index].nomor_polisi = nomor_polisi;
      mobils[index].nama = nama;
      mobils[index].jenis_bbm = jenis_bbm;
      mobils[index].warna = warna;
      mobils[index].harga = Number(harga);
      mobils[index].biaya_pajak = Number(biaya_pajak);
      mobils[index].jatuh_tempo_pajak = jatuh_tempo_pajak;
    }

    afterAction(form);
    appStore.setAlerts("success", "Aksi Berhasil", "Berhasil Ubah Data Mobil");
  };

  const deleteMobil = async (form: MobilForm) => {
    if (appStore.loading) {
      return;
    }

    appStore.loading = true;
    const item = appStore.dialog.item as FormattedMobil;
    const index = mobils.findIndex((mobil) => mobil.id === item.id);

    if (index !== -1) {
      mobils.splice(index, 1);
    }

    afterAction(form);
    appStore.setAlerts("success", "Aksi Berhasil", "Berhasil Hapus Data Mobil");
  };

  const afterAction = (form: MobilForm) => {
    resetForm(form);
    appStore.resetDialog();
  };

  const resetForm = (form: MobilForm) => {
    form.merek.value = "";
    form.merek.error = "";

    form.jenis.value = "";
    form.jenis.error = "";

    form.nomor_polisi.value = "";
    form.nomor_polisi.error = "";

    form.nama.value = "";
    form.nama.error = "";

    form.jenis_bbm.value = null;
    form.jenis_bbm.error = "";

    form.warna.value = "";
    form.warna.error = "";

    form.harga.value = "";
    form.harga.digit = "";
    form.harga.error = "";

    form.biaya_pajak.value = "";
    form.biaya_pajak.digit = "";
    form.biaya_pajak.error = "";

    form.jatuh_tempo_pajak.value = null;
    form.jatuh_tempo_pajak.error = "";
  };

  return {
    createMobil,
    updateMobil,
    deleteMobil,
    resetForm,
  };
}
