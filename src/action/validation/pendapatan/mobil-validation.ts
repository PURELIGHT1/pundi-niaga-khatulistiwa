import { Mobil } from "@/models/mobil-model";
import { useMobilStore } from "@/stores/mobil-store";
import { usePendapatanStore } from "@/stores/pendapatan-store";
import { nextTick } from "vue";

export async function mobilValidation(
  mobil: Mobil | null,
): Promise<{ value: Mobil | null; error: string }> {
  const pendapatanStore = usePendapatanStore();
  const mobilStore = useMobilStore();
  const value = mobil;
  let error = "";

  if (!value) {
    error = "Mobil Tidak Boleh Kosong!";
  } else if (!mobilStore.mobils.some((mobil) => mobil.id === value.id)) {
    error = "Mobil Tidak Valid!";
  }
  await nextTick(() => {
    pendapatanStore.form.mobil.value = value;
    pendapatanStore.form.mobil.error = error;
  });

  return { value, error };
}
