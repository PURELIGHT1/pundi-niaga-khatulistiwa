import { useSopirStore } from "@/stores/sopir-store";
import { nextTick } from "vue";

export async function nomorHpValidation(
  nomor_hp: string,
): Promise<{ value: string; digit: string; error: string }> {
  const sopirStore = useSopirStore();
  const regex1 = /^[^8]+|\D+/g;
  const regex2 = /^.{14,}$/g;
  const regex3 = /[-]+|\D+/g;
  let value = nomor_hp;
  let digit = "";
  let error = "";

  value = value.replace(regex1, "").replace(regex2, value.substring(0, 14));

  if (!value) {
    error = "Nomor HP Tidak Boleh Kosong!";
  } else {
    digit = value.replace(regex3, "");

    if (digit.length < 9) {
      error = "Nomor HP Minimal 9 Digit!";
    } else if (digit.length > 12) {
      digit = digit.substring(0, 12);
    }

    value = digit.toNomorHP();
  }

  await nextTick(() => {
    sopirStore.form.nomor_hp.value = value;
    sopirStore.form.nomor_hp.digit = digit;
    sopirStore.form.nomor_hp.error = error;
  });

  return { value, digit, error };
}
