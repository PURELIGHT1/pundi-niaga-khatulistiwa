import i18n from "@/plugins/i18n";
import { useSopirStore } from "@/stores/sopir-store";
import { nextTick } from "vue";

export async function uangMinyakValidation(
  uang_minyak: string,
): Promise<{ value: string; digit: string; error: string }> {
  const sopirStore = useSopirStore();
  const regex1 = /\D+/g;
  const regex2 = /^0\d+/g;
  const regex3 = /[.]+|\D+/g;
  let value = uang_minyak;
  let error = "";
  let digit = "";

  value = value.replace(regex1, "").replace(regex2, "0");

  if (!value) {
    error = "Uang Minyak Tidak Boleh Kosong!";
  } else {
    digit = value.replace(regex3, "");

    if (digit.length > 9) {
      digit = digit.substring(0, 9);
    }

    value = i18n.global.n(Number(digit), "decimal", "id");
  }
  await nextTick(() => {
    sopirStore.form.uang_minyak.value = value;
    sopirStore.form.uang_minyak.digit = digit;
    sopirStore.form.uang_minyak.error = error;
  });

  return { value, digit, error };
}
