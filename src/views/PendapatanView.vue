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
          :search="pendapatanStore.search"
          :items="pendapatanStore.formattedPendapatans"
          :headers="pendapatanStore.getTableHeaders"
          :custom-key-sort="pendapatanStore.customKeySort()"
          :sort-by="[{ key: 'tanggal_bongkar', order: 'desc' }]"
        >
          <template #top>
            <VLayout class="pt-1 pb-2">
              <VBtn
                height="56px"
                color="secondary"
                @click="appStore.setDialog(undefined, PendapatanDialogView, 'create')"
              >
                Tambah Pendapatan
              </VBtn>
              <VDivider class="mx-2" color="transparent" vertical />
              <CustomTextField
                v-model="pendapatanStore.search"
                label="Cari Data Pendapatan"
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
                @click="appStore.setDialog(item, PendapatanDialogView, 'update')"
              >
                <VIcon size="20" icon="$pencil" />
              </VBtn>

              <VBtn
                size="32"
                variant="tonal"
                :elevation="0"
                color="error"
                @click="appStore.setDialog(item, PendapatanDialogView, 'delete')"
              >
                <VIcon size="20" icon="$delete" />
              </VBtn>
            </VLayout>
          </template>

          <template #item.sopir="{ item }">
            <VLayout>
              <span class="text-pre">
                {{ item.sopir }}
              </span>
            </VLayout>
          </template>

          <template #item.mobil="{ item }">
            <VLayout>
              <span class="text-pre">
                {{ item.mobil }}
              </span>
            </VLayout>
          </template>
        </VDataTable>
      </VCard>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app-store'
import { usePendapatanStore } from '@/stores/pendapatan-store'
import { watch } from 'vue'
import PendapatanDialogView from './dialogs/PendapatanDialogView.vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { getFormattedPendapatans } from '@/stores/data/pendapatan'

const appStore = useAppStore()
const pendapatanStore = usePendapatanStore()

watch(
  () => [appStore.active.child, pendapatanStore.pendapatans],
  (values) => {
    if (values[0] && values[1]) {
      pendapatanStore.formattedPendapatans = getFormattedPendapatans(pendapatanStore.pendapatans)
      appStore.loading = false
    }
  },
  { immediate: true, deep: true },
)
</script>
