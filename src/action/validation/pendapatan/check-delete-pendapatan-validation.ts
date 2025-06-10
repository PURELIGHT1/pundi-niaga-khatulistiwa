import { useAppStore } from "@/stores/app-store";
import { UserJenis } from "@/models/user-model";
import { nextTick } from "vue";
import { usePendapatanStore } from "@/stores/pendapatan-store";

export async function checkDeletePendapatanValidation(
  action: string,
): Promise<{ value: boolean; error: string | null }> {
  const pendapatanStore = usePendapatanStore();
  const appStore = useAppStore();

  let value: boolean = true;
  let error: string | null = null;

  if (action === "delete" && appStore.user.jenis !== UserJenis.Pemilik) {
    value = false;
    error =
      "Hanya pemilik yang dapat menghapus pendapatan, silakan konfirmasi kepada owner";

    await nextTick(() => {
      pendapatanStore.validateDelete.response.value = value;
      pendapatanStore.validateDelete.response.error = error;
    });
  }

  return { value, error };
}
