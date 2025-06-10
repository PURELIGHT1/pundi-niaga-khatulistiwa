import { usePengeluaranStore } from "@/stores/pengeluaran-store";
import { nextTick } from "vue";

export async function tanggalValidation(
  tanggal: Date | null,
): Promise<{ value: Date | null; error: string }> {
  const pengeluaranStore = usePengeluaranStore();
  const value = tanggal;
  let error = "";
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  if (!value) {
    error = "Tanggal Tidak Boleh Kosong!";
  } else if (value.getTime() > date.getTime()) {
    error = "Tanggal Tidak Boleh Masa Depan!";
  }

  await nextTick(() => {
    pengeluaranStore.form.tanggal.value = value;
    pengeluaranStore.form.tanggal.error = error;
  });

  return { value, error };
}
