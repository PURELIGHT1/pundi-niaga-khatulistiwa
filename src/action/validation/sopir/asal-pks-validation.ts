import { useSopirStore } from "@/stores/sopir-store";
import { nextTick } from "vue";

export async function asalPKSValidation(
  asal_pks: string,
): Promise<{ value: string; error: string }> {
  const sopirStore = useSopirStore();
  const regex1 = / {2,}/g;
  const regex2 = /^ {1,}/gm;

  let value = asal_pks;
  let error = "";

  value = value.replace(regex1, " ").replace(regex2, "");

  if (!value) {
    error = "Asal PKS Tidak Boleh Kosong!";
  } else if (value.length > 50) {
    error = "Asal PKS Terlalu Panjang!";
  }

  await nextTick(() => {
    sopirStore.form.asal_pks.value = value;
    sopirStore.form.asal_pks.error = error;
  });

  return { value, error };
}
