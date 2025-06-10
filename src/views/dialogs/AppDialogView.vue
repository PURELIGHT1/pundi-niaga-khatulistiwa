<template>
  <VLayout class="position-relative mb-8">
    <VBtn position="absolute" size="32px" variant="tonal" :elevation="0" @click="
      () => {
        pksStore.resetForm()
        appStore.resetDialog()
      }
    ">
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} PKS </span>
  </VLayout>

  <!-- ~1~DELETE -->
  <template v-if="action === 'delete'">
    <VLayout>
      <VCard class="pa-1 mx-auto" color="surface" :elevation="4">
        <VIcon icon="$alert" size="128px" color="primary" />
      </VCard>
    </VLayout>

    <VLayout class="d-flex flex-column mt-8">
      <span class="font-weight-bold mx-auto"> Detail </span>

      <CustomGridLayout class="overflow-auto align-self-center"
        grid-template-columns="minmax(0px, 1fr) auto minmax(0px, 1fr)" width="fit-content">
        <template v-for="(item, i) in getDetails" :key="i">
          <span class="font-weight-medium"> {{ item.title }} </span>
          <span> &nbsp;:&nbsp; </span>
          <span> {{ item.value }} </span>
        </template>
      </CustomGridLayout>
    </VLayout>
  </template>

  <!-- ~1~CREATE & UPDATE -->
  <template v-else>
    <VForm>
      <CustomTextField v-model="pksStore.form.nama.value" label="Nama" placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$office-building',
          passive: '$office-building-outline',
        }" @update:model-value="(val) => onFieldChange(pksFieldForm.nama, val)" />
      <VDivider class="my-1" />

      <CustomSelect v-if="props.action !== 'create'" v-model="pksStore.form.is_active.value" :items="itemsStatus"
        label="Status" placeholder="Pilih Salah Satu" :prepend-inner-icon="{
          active: '$toggle-on',
          passive: '$toggle-off',
        }" item-value="value" item-title="label"
        @update:model-value="(val) => onFieldChange(pksFieldForm.status, val)" />
      <VDivider class="my-1" />
    </VForm>
  </template>

  <div class="my-4"></div>

  <VBtn height="56px" block color="secondary" @click="
    () => {
      (pksStore as any)[action](props);
    }
  ">
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="ts">
  import { namaValidation, statusValidation } from '@/action/validation/pks'
  import CustomGridLayout from '@/components/CustomGridLayout.vue'
  import CustomSelect from '@/components/CustomSelect.vue'
  import CustomTextField from '@/components/CustomTextField.vue'
  import { pksFieldForm } from '@/models/action-model'
  import { DialogAction } from '@/models/app-model'
  import { FormattedPKS, StatusPKS } from '@/models/pks-model'
  import { useAppStore } from '@/stores/app-store'
  import { usePKSStore } from '@/stores/pks-store'
  import { computed, onBeforeMount } from 'vue'

  const props = defineProps({
    action: {
      type: String as () => DialogAction,
      required: true,
    },
  })

  const appStore = useAppStore()
  const pksStore = usePKSStore()
  const getItem = computed(() => appStore.dialog.item as FormattedPKS)

  const itemsStatus = [...StatusPKS]

  const getTitle = computed(() => {
    switch (props.action) {
      case 'create':
        return 'Tambah'
      case 'update':
        return 'Ubah'
      default:
        return 'Hapus'
    }
  })

  const getDetails = computed(() => [
    {
      title: 'Nama PKS',
      value: getItem.value.nama,
    },
    {
      title: 'Status Aktif',
      value: getItem.value.is_active ? 'Aktif' : 'Non Aktif',
    },
  ])

  function onFieldChange(field: pksFieldForm, value: string | boolean) {
    switch (field) {
      case 'nama':
        namaValidation(value as string)
        break
      case 'status':
        statusValidation(value as boolean)
        break
    }
  }

  onBeforeMount(() => {
    if (props.action === 'update') {
      pksStore.form.nama.value = getItem.value.nama
      pksStore.form.is_active.value = getItem.value.is_active

      namaValidation(getItem.value.nama)
      statusValidation(getItem.value.is_active)
    }
  })
</script>
