import { StatusSparePart } from "@/models/spare-part-model";
import { useSparePartStore } from "@/stores/spare-part-store";
import { nextTick } from "vue";

export async function statusValidation(
  status_pembelian: StatusSparePart | null,
): Promise<{ value: StatusSparePart | null; error: string }> {
  const sparePart = useSparePartStore();
  const value = status_pembelian;
  let error = "";

  if (!value) {
    error = "Status Pembelian Tidak Boleh Kosong!";
  } else if (!Object.values(StatusSparePart).includes(value)) {
    error = "Status Pembelian Tidak Valid!";
  }

  await nextTick(() => {
    sparePart.form.status_pembelian.value = value;
    sparePart.form.status_pembelian.error = error;
  });

  return { value, error };
}
