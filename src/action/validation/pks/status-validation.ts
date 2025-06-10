import { nextTick } from "vue";
import { usePKSStore } from "@/stores/pks-store";
import { StatusPKS } from "@/models/pks-model";

export async function statusValidation(
  status: boolean | null,
): Promise<{ value: boolean | null; error: string }> {
  const pksStore = usePKSStore();
  let value = status;
  let error = "";

  if (value === null) {
    error = "Status PKS Tidak Boleh Kosong!";
  } else {
    const found = StatusPKS.find((w) => w.value === value);
    if (found) {
      value = found.value;
    } else {
      error = "Status PKS Tidak Valid!";
    }
  }

  await nextTick(() => {
    pksStore.form.is_active.value = value;
    pksStore.form.is_active.error = error;
  });

  return { value, error };
}
