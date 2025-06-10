<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
    <VLayout
      v-if="appStore.active.child"
      class="d-scroll pa-2 overflow-auto"
      min-height="fit-content"
      max-height="100vh"
    >
      <VCard class="ma-auto pa-4" color="surface" min-width="100%" width="0px">
        <VDataTable
          :search="userStore.search"
          :items="userStore.formattedUsers"
          :headers="userStore.getTableHeaders"
          :custom-key-sort="userStore.customKeySort()"
        >
          <template #top>
            <VLayout class="pt-1 pb-2">
              <VBtn
                height="56px"
                color="secondary"
                @click="appStore.setDialog(undefined, AdminDialogView, 'create')"
              >
                Tambah Admin
              </VBtn>
              <VDivider class="mx-2" color="transparent" vertical />
              <CustomTextField
                v-model="userStore.search"
                label="Cari Data Admin"
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
                @click="appStore.setDialog(item, AdminDialogView, 'update')"
              >
                <VIcon size="20" icon="$pencil" />
              </VBtn>

              <VBtn
                size="32"
                variant="tonal"
                :elevation="0"
                color="error"
                @click="appStore.setDialog(item, AdminDialogView, 'delete')"
              >
                <VIcon size="20" icon="$delete" />
              </VBtn>
            </VLayout>
          </template>
        </VDataTable>
      </VCard>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app-store'
import { useUserStore } from '@/stores/user-store'
import { watch } from 'vue'
import AdminDialogView from './dialogs/AdminDialogView.vue'
import { UserJenis } from '@/models/user-model'
import CustomTextField from '@/components/CustomTextField.vue'
import { getFormattedUsers } from '@/stores/data/user'

const appStore = useAppStore()
const userStore = useUserStore()

watch(
  () => [appStore.active.child, userStore.users],
  (values) => {
    if (values[0] && values[1]) {
      userStore.formattedUsers = getFormattedUsers(userStore.users, UserJenis.Admin)
      appStore.loading = false
    }
  },
  { immediate: true, deep: true },
)
</script>
