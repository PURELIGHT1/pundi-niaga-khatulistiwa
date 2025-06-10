import { useAppStore } from "@/stores/app-store";
import { SopirForm } from "@/models/sopir-model";
import {
  asalPKSValidation,
  namaLengkapValidation,
  nomorHpValidation,
  nomorSIMValidation,
  tujuanPKSValidation,
  uangMinyakValidation,
} from "../sopir";

export async function checkSopirValidation(
  action: string,
  form: SopirForm,
): Promise<boolean> {
  const appStore = useAppStore();
  const [namaLengkap, nomorHp, nomorSim, asalPks, tujuanPks, uangMinyak] =
    await Promise.all([
      namaLengkapValidation(form.nama_lengkap.value),
      nomorHpValidation(form.nomor_hp.value),
      nomorSIMValidation(form.nomor_sim.value),
      asalPKSValidation(form.asal_pks.value),
      tujuanPKSValidation(form.tujuan_pks.value),
      uangMinyakValidation(form.uang_minyak.value),
    ]);

  const isValidationValid =
    !namaLengkap.error &&
    !nomorHp.error &&
    !nomorSim.error &&
    !asalPks.error &&
    !tujuanPks.error &&
    !uangMinyak.error;

  if (!isValidationValid) {
    const nama_lengkap = form.nama_lengkap.error;
    const nomor_hp = form.nomor_hp.error;
    const nomor_sim = form.nomor_sim.error;
    const asal_pks = form.asal_pks.error;
    const tujuan_pks = form.tujuan_pks.error;
    const uang_minyak = form.uang_minyak.error;

    appStore.setAlerts(
      "error",
      "Aksi Gagal",
      `${nama_lengkap ? `${nama_lengkap}\n` : ""}${nomor_hp ? `${nomor_hp}\n` : ""}${nomor_sim ? `${nomor_sim}\n` : ""}${asal_pks ? `${asal_pks}\n` : ""}${tujuan_pks ? `${tujuan_pks}\n` : ""}${uang_minyak ? `${uang_minyak}\n` : ""}`,
    );

    return false;
  }

  return true;
}
