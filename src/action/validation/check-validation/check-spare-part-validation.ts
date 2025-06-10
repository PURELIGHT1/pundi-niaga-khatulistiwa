import { useAppStore } from "@/stores/app-store";
import {
  merekValidation,
  jenisValidation,
  namaValidation,
  hargaValidation,
  stokValidation,
  statusValidation,
} from "../spare-part";
import { SparePartForm } from "@/models/spare-part-model";
import { UserJenis } from "@/models/user-model";

export async function checkSparePartValidation(
  action: string,
  form: SparePartForm,
): Promise<boolean> {
  const appStore = useAppStore();
  const [merk, jenis, nama, harga, stok, status_pembelian] = await Promise.all([
    action !== "updateStatus"
      ? merekValidation(form.merek.value)
      : { error: "" },
    action !== "updateStatus"
      ? jenisValidation(form.jenis.value)
      : { error: "" },
    action !== "updateStatus" ? namaValidation(form.nama.value) : { error: "" },
    action !== "updateStatus"
      ? hargaValidation(form.harga.value)
      : { error: "" },
    action !== "updateStatus" ? stokValidation(form.stok.value) : { error: "" },
    action !== "update"
      ? statusValidation(form.status_pembelian.value)
      : { error: "" },
  ]);

  const isValidationValid =
    !merk.error &&
    !jenis.error &&
    !nama.error &&
    !harga.error &&
    !stok.error &&
    !status_pembelian.error;

  if (!isValidationValid) {
    const merek = form.merek.error;
    const jenis = form.jenis.error;
    const nama = form.nama.error;
    const harga = form.harga.error;
    const stok = form.stok.error;
    const status_pembelian = form.status_pembelian.error;

    appStore.setAlerts(
      "error",
      "Aksi Gagal",
      `${merek ? `${merek}\n` : ""}${jenis ? `${jenis}\n` : ""}${nama ? `${nama}\n` : ""}${harga ? `${harga}\n` : ""}${stok ? `${stok}\n` : ""}${appStore.user.jenis == UserJenis.Pemilik ? `${status_pembelian}\n` : ""}`,
    );

    return false;
  }

  return true;
}
