import { useMobilStore } from "@/stores/mobil-store";
import { nextTick } from "vue";

export async function jatuhTempoPajakValidation(
  jatuh_tempo_pajak: Date | null,
): Promise<{ value: Date | null; error: string }> {
  const mobileStore = useMobilStore();
  const value = jatuh_tempo_pajak;
  let error = "";
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  if (!value) {
    error = "Jatuh Tempo Pajak Tidak Boleh Kosong!";
  } else if (value.getTime() <= date.getTime()) {
    error = "Jatuh Tempo Pajak Tidak Boleh Masa Lalu!";
  }

  await nextTick(() => {
    mobileStore.form.jatuh_tempo_pajak.value = value;
    mobileStore.form.jatuh_tempo_pajak.error = error;
  });

  return { value, error };
}
