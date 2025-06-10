import { useMobilStore } from "@/stores/mobil-store";
import { nextTick } from "vue";

export async function nomorPolisiValidation(
  nomor_polisi: string,
): Promise<{ value: string; error: string }> {
  const mobileStore = useMobilStore();
  const regex1 = /^[^A-Z]+|[^A-Z0-9]|\s+0+/g;
  const regex2 = /^[A-Z]{3,}|^[A-Z]+0+/;
  const regex3 = /([A-Z]{1,2})([1-9]{1}[0-9]{0,3})/;
  const regex4 = /([A-Z]{1,2})([1-9]{1}[0-9]{0,3})([A-Z]{1,3})/;

  let value = nomor_polisi.toUpperCase();
  let error = "";

  value = value.replace(regex1, "").replace(regex2, value.substring(0, 2));
  if (!value) {
    error = "Nomor Polisi Tidak Boleh Kosong!";
  } else {
    const initialValue = value;
    let match = initialValue.match(regex3);

    if (match) {
      value = `${match[1]} ${match[2]}`;
    } else {
      error = "Format Nomor Polisi Tidak Valid! Contoh: KT 1234 AB";
    }

    match = initialValue.match(regex4);
    if (match) {
      value = `${match[1]} ${match[2]} ${match[3]}`;
    }
    const containsDigit = /\d/.test(value);
    if (!containsDigit && !error) {
      error = "Nomor Polisi Harus Mengandung Angka!";
    }
  }

  await nextTick(() => {
    mobileStore.form.nomor_polisi.value = value;
    mobileStore.form.nomor_polisi.error = error;
  });

  return { value, error };
}
