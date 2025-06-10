import { useSopirStore } from "@/stores/sopir-store";
import { nextTick } from "vue";

export async function nomorSIMValidation(
  nomor_sim: string,
): Promise<{ value: string; digit: string; error: string }> {
  const sopirStore = useSopirStore();
  const regex1 = /^0+|\D+/g;
  const regex2 = /^.{16,}$/g;
  const regex3 = /[-]+|\D+/g;
  let value = nomor_sim;
  let digit = "";
  let error = "";

  value = value.replace(regex1, "").replace(regex2, value.substring(0, 16));

  if (!value) {
    error = "Nomor SIM Tidak Boleh Kosong!";
  } else {
    digit = value.replace(regex3, "");

    if (digit.length < 14) {
      error = "Nomor SIM Harus 14 Digit!";
    } else if (digit.length > 14) {
      digit = digit.substring(0, 14);
    }

    value = digit.toNomorSIM();
  }

  await nextTick(() => {
    sopirStore.form.nomor_sim.value = value;
    sopirStore.form.nomor_sim.digit = digit;
    sopirStore.form.nomor_sim.error = error;
  });

  return { value, digit, error };
}
