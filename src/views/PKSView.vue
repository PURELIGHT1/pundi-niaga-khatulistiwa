<!-- eslint-disable vue/valid-v-slot -->

<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
    <VLayout
      v-if="appStore.active.child"
      class="d-scroll pa-2 overflow-auto"
      min-height="fit-content"
      max-height="100vh"
    >
      <VCard class="ma-auto pa-4" color="surface" :style="{ minWidth: '100%', width: '0px' }">
        <VDataTable
          :search="pksStore.search"
          :items="pksStore.formattedPKSes"
          :headers="pksStore.getTableHeaders"
          :custom-key-sort="pksStore.customKeySort()"
        >
          <template #top>
            <VLayout class="pt-1 pb-2">
              <VBtn
                height="56px"
                color="secondary"
                @click="appStore.setDialog(undefined, PKSDialogView, 'create')"
              >
                Tambah PKS
              </VBtn>
              <VDivider class="mx-2" color="transparent" vertical />
              <CustomTextField
                v-model="pksStore.search"
                label="Cari Data PKS"
                :prepend-inner-icon="{
                  active: '$text-box-search',
                  passive: '$text-box-search-outline',
                }"
                clearable
              />
            </VLayout>
          </template>

          <template #headers="{ columns, isSorted, getSortIcon, toggleSort }">
            <tr>
              <template v-for="column in columns" :key="column.key">
                <td class="pa-1">
                  <VCard
                    class="d-flex align-center pa-4"
                    variant="tonal"
                    width="100%"
                    height="100%"
                    color="primary"
                    @click="
                      () => {
                        if (column.sortable) {
                          toggleSort(column)
                        }
                      }
                    "
                  >
                    <span class="text-body-1 font-weight-bold text-no-wrap mr-2">
                      {{ column.title }}
                    </span>
                    <VSpacer />

                    <template v-if="isSorted(column)">
                      <v-icon :icon="getSortIcon(column)"></v-icon>
                    </template>
                  </VCard>
                </td>
              </template>
            </tr>
          </template>

          <template #item.opsi="{ item }">
            <VLayout>
              <VBtn
                class="mr-1"
                size="32"
                variant="tonal"
                :elevation="0"
                color="secondary"
                @click="appStore.setDialog(item, PKSDialogView, 'update')"
              >
                <VIcon size="20" icon="$pencil" />
              </VBtn>

              <VBtn
                size="32"
                :variant="disabled(item.id) ? 'text' : 'tonal'"
                :elevation="0"
                color="error"
                :disabled="disabled(item.id)"
                @click="
                  () => {
                    if (!disabled(item.id)) {
                      appStore.setDialog(item, PKSDialogView, 'delete')
                    }
                  }
                "
              >
                <VIcon size="20" icon="$delete" />
              </VBtn>
            </VLayout>
          </template>

          <template #item.is_active="{ item }">
            <VChip
              :color="pksStore.getStatusPKS(item.is_active).color"
              variant="flat"
              size="small"
              class="text-capitalize"
            >
              {{ pksStore.getStatusPKS(item.is_active).text }}
            </VChip>
          </template>
        </VDataTable>
      </VCard>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app-store'
import { usePKSStore } from '@/stores/pks-store'
import PKSDialogView from './dialogs/PKSDialogView.vue'
import { watch } from 'vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { getFormattedPKSes } from '@/stores/data/pks'

const appStore = useAppStore()
const pksStore = usePKSStore()

const disabled = (id: number) => {
  const pks = pksStore.pks?.find((pks) => pks.id === id) ?? null
  if (pks != null && pks.is_active === true) {
    return false
  }
  return true
}

watch(
  () => [appStore.active.child, pksStore.pks],
  (values) => {
    if (values[0] && values[1]) {
      pksStore.formattedPKSes = getFormattedPKSes(pksStore.pks)
      appStore.loading = false
    }
  },
  { immediate: true, deep: true },
)
</script>
