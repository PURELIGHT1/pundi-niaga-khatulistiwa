import { usePendapatanStore } from "@/stores/pendapatan-store";
import { nextTick } from "vue";

export async function tanggalBongkarValidation(
  tanggal_muat: Date | null,
  tanggal_bongkar: Date | null,
): Promise<{ value: Date | null; error: string }> {
  const pendapatanStore = usePendapatanStore();
  const value = tanggal_bongkar;
  let error = "";
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const value_tanggal_muat = tanggal_muat;

  if (!value) {
    error = "Tanggal Bongkar Tidak Boleh Kosong!";
  } else if (value.getTime() > date.getTime()) {
    error = "Tanggal Bongkar Tidak Boleh Masa Depan!";
  } else if (
    value_tanggal_muat &&
    value.getTime() < value_tanggal_muat.getTime()
  ) {
    error = "Tanggal Bongkar Tidak Boleh Sebelum Tanggal Muat!";
  }

  await nextTick(() => {
    pendapatanStore.form.tanggal_bongkar.value = value;
    pendapatanStore.form.tanggal_bongkar.error = error;
  });

  return { value, error };
}
