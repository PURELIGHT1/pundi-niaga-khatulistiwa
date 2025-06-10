import { useMobilStore } from "@/stores/mobil-store";
import { nextTick } from "vue";

export async function namaValidation(
  nama: string,
): Promise<{ value: string; error: string }> {
  const mobileStore = useMobilStore();
  const regex1 = / {2,}/g;
  const regex2 = /^ {1,}/gm;

  let value = nama;
  let error = "";

  value = value.replace(regex1, " ").replace(regex2, "");

  if (!value) {
    error = "Nama Tidak Boleh Kosong!";
  } else if (value.length > 50) {
    error = "Nama Terlalu Panjang!";
  }

  await nextTick(() => {
    mobileStore.form.nama.value = value;
    mobileStore.form.nama.error = error;
  });

  return { value, error };
}
