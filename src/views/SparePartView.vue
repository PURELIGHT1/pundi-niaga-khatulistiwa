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
          :search="sparePartStore.search"
          :items="sparePartStore.formattedSpareParts"
          :headers="sparePartStore.getTableHeaders"
          :custom-key-sort="sparePartStore.customKeySort()"
        >
          <template #top>
            <VLayout class="pt-1 pb-2">
              <VBtn
                height="56px"
                color="secondary"
                @click="appStore.setDialog(undefined, SparePartDialogView, 'create')"
              >
                Tambah Spare Part
              </VBtn>
              <VDivider class="mx-2" color="transparent" vertical />
              <CustomTextField
                v-model="sparePartStore.search"
                label="Cari Data Spare Part"
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
                @click="appStore.setDialog(item, SparePartDialogView, 'update')"
              >
                <VIcon size="20" icon="$pencil" />
              </VBtn>

              <VBtn
                v-if="appStore.user.jenis === UserJenis.Pemilik"
                class="mr-1"
                size="32"
                variant="tonal"
                :elevation="0"
                color="warning"
                @click="appStore.setDialog(item, SparePartDialogView, 'updateStatus')"
              >
                <VIcon size="20" icon="$statuses" />
              </VBtn>
              <VBtn
                v-if="
                  appStore.user.jenis === UserJenis.Bengkel &&
                  item.status_pembelian == StatusSparePart.BelumBeli
                "
                class="mr-1"
                size="32"
                :variant="disabledKonfirmasi(item.id) ? 'text' : 'tonal'"
                :elevation="0"
                color="warning"
                :disabled="disabledKonfirmasi(item.id)"
                @click="
                  () => {
                    if (!disabledKonfirmasi(item.id)) {
                      appStore.setDialog(item, SparePartDialogView, 'konfirmasi')
                    }
                  }
                "
              >
                <VIcon size="20" icon="$package" />
              </VBtn>

              <VBtn
                size="32"
                v-if="
                  appStore.user.jenis == UserJenis.Pemilik || appStore.user.jenis == UserJenis.Admin
                "
                :variant="disabled(item.id) ? 'text' : 'tonal'"
                :elevation="0"
                color="error"
                :disabled="disabled(item.id)"
                @click="
                  () => {
                    if (!disabled(item.id)) {
                      appStore.setDialog(item, SparePartDialogView, 'delete')
                    }
                  }
                "
              >
                <VIcon size="20" icon="$delete" />
              </VBtn>
            </VLayout>
          </template>

          <template #item.status_pembelian="{ item }">
            <VChip
              :color="sparePartStore.getStatusBayar(item.status_pembelian, item.stok).color"
              :append-icon="sparePartStore.getStatusBayar(item.status_pembelian, item.stok).icon"
              variant="flat"
              size="small"
              class="text-capitalize"
            >
              {{ sparePartStore.getStatusBayar(item.status_pembelian, item.stok).text }}
            </VChip>
          </template>
        </VDataTable>
      </VCard>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app-store'
import { useSparePartStore } from '@/stores/spare-part-store'
import SparePartDialogView from './dialogs/SparePartDialogView.vue'
import { watch } from 'vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { getFormattedSpareParts } from '@/stores/data/spare-part'
import { UserJenis } from '@/models/user-model'
import { StatusSparePart } from '@/models/spare-part-model'

const appStore = useAppStore()
const sparePartStore = useSparePartStore()

const disabled = (id: number) => {
  const sparePart = sparePartStore.spareParts?.find((sparePart) => sparePart.id === id) ?? null
  if (
    sparePart != null &&
    (sparePart.status_pembelian === StatusSparePart.BelumBeli || sparePart?.stok < Number('1'))
  ) {
    return false
  }
  return true
}

const disabledKonfirmasi = (id: number) => {
  const sparePart = sparePartStore.spareParts?.find((sparePart) => sparePart.id === id) ?? null
  if (sparePart != null && sparePart.butuh_konfirmasi === false) {
    return false
  }
  return true
}

watch(
  () => [appStore.active.child, sparePartStore.spareParts],
  (values) => {
    if (values[0] && values[1]) {
      sparePartStore.formattedSpareParts = getFormattedSpareParts(sparePartStore.spareParts)
      appStore.loading = false
    }
  },
  { immediate: true, deep: true },
)
</script>
