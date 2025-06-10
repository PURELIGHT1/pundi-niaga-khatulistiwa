import { PengeluaranType } from "@/models/pengeluaran-model";
import { usePengeluaranStore } from "@/stores/pengeluaran-store";
import { nextTick } from "vue";

export async function tipeValidation(
  tipe: PengeluaranType | null,
): Promise<{ value: PengeluaranType | null; error: string }> {
  const pengeluaranStore = usePengeluaranStore();
  const value = tipe;
  let error = "";

  if (!value) {
    error = "Tipe Tidak Boleh Kosong!";
  } else if (!Object.values(PengeluaranType).includes(value)) {
    error = "Tipe Tidak Valid!";
  }

  await nextTick(() => {
    pengeluaranStore.form.tipe.value = value;
    pengeluaranStore.form.tipe.error = error;
  });

  return { value, error };
}
