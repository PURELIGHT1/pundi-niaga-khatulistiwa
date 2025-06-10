import i18n from "@/plugins/i18n";
import { useSparePartStore } from "@/stores/spare-part-store";
import { nextTick } from "vue";

export async function stokValidation(
  stok: string,
): Promise<{ value: string; digit: string; error: string }> {
  const sparePartStore = useSparePartStore();
  const regex1 = /\D+/g;
  const regex2 = /^0\d+/g;
  const regex3 = /[.]+|\D+/g;
  let value = stok;
  let error = "";
  let digit = "";

  value = value.replace(regex1, "").replace(regex2, "0");

  if (!value) {
    error = "stok Tidak Boleh Kosong!";
  } else {
    digit = value.replace(regex3, "");

    if (digit.length > 4) {
      digit = digit.substring(0, 4);
    }

    value = i18n.global.n(Number(digit), "decimal", "id");
  }

  await nextTick(() => {
    sparePartStore.form.stok.value = value;
    sparePartStore.form.stok.digit = digit;
    sparePartStore.form.stok.error = error;
  });

  return { value, digit, error };
}
