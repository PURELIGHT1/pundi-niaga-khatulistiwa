<template>
  <VLayout class="position-relative mb-8">
    <VBtn
      position="absolute"
      size="32px"
      variant="tonal"
      :elevation="0"
      @click="
        () => {
          sparePartStore.resetForm()
          appStore.resetDialog()
        }
      "
    >
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} Spare Part </span>
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

      <CustomGridLayout
        class="overflow-auto align-self-center"
        grid-template-columns="minmax(0px, 1fr) auto minmax(0px, 1fr)"
        width="fit-content"
      >
        <template v-for="(item, i) in getDetails" :key="i">
          <span class="font-weight-medium"> {{ item.title }} </span>
          <span> &nbsp;:&nbsp; </span>
          <span> {{ item.value }} </span>
        </template>
      </CustomGridLayout>
    </VLayout>
  </template>

  <template v-else-if="props.action === 'updateStatus'">
    <VLayout>
      <CustomGridLayout
        class="overflow-auto align-self-center"
        grid-template-columns="minmax(0px, 1fr) auto minmax(0px, 1fr)"
        width="fit-content"
      >
        <template v-for="(item, i) in getDetailsUpdateStatus" :key="i">
          <span class="font-weight-medium"> {{ item.title }} </span>
          <span> &nbsp;:&nbsp; </span>
          <span> {{ item.value }} </span>
        </template>
      </CustomGridLayout>
    </VLayout>
    <VDivider class="my-1" />

    <CustomSelect
      v-model="sparePartStore.form.status_pembelian.value"
      :items="Object.values(StatusSparePart)"
      label="Status Pembelian Spare Part"
      placeholder="Pilih Salah Satu"
      @update:mgasodel-value="
        (val: StatusSparePart) =>
          onFieldChange(sparePartFieldForm.status_pembelian, val)
      "
    />
  </template>

  <template v-else-if="props.action === 'konfirmasi'">
    <VLayout>
      <VIcon class="pa-1 mx-auto" icon="$package" size="128px" color="surface" />
    </VLayout>

    <VLayout class="d-flex flex-column mt-8">
      <span class="font-weight-bold mx-auto"> Detail </span>

      <CustomGridLayout
        class="overflow-auto align-self-center"
        grid-template-columns="minmax(0px, 1fr) auto minmax(0px, 1fr)"
        width="fit-content"
      >
        <template v-for="(item, i) in getDetails" :key="i">
          <span class="font-weight-medium"> {{ item.title }} </span>
          <span> &nbsp;:&nbsp; </span>
          <span> {{ item.value }} </span>
        </template>
      </CustomGridLayout>
    </VLayout>
    <VDivider class="my-1" />
  </template>

  <!-- ~1~CREATE & UPDATE -->
  <template v-else>
    <VForm>
      <CustomTextField
        v-model="sparePartStore.form.merek.value"
        label="Merek"
        placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$cog',
          passive: '$cog-outline',
        }"
        @update:model-value="(val) => onFieldChange(sparePartFieldForm.merek, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="sparePartStore.form.jenis.value"
        label="Jenis"
        placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$wrench-cog',
          passive: '$wrench-cog-outline',
        }"
        @update:model-value="(val) => onFieldChange(sparePartFieldForm.jenis, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="sparePartStore.form.nama.value"
        label="Nama"
        placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$folder-wrench',
          passive: '$folder-wrench-outline',
        }"
        @update:model-value="(val) => onFieldChange(sparePartFieldForm.nama, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="sparePartStore.form.harga.value"
        label="Harga"
        placeholder="1.000.000"
        :prepend-inner-icon="{
          active: '$tag',
          passive: '$tag-outline',
        }"
        prefix="Rp"
        @update:model-value="(val) => onFieldChange(sparePartFieldForm.harga, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="sparePartStore.form.stok.value"
        label="Stok"
        placeholder="100"
        :prepend-inner-icon="{
          active: '$clipboard-list',
          passive: '$clipboard-list-outline',
        }"
        @update:model-value="(val) => onFieldChange(sparePartFieldForm.stok, val)"
      />
      <VDivider class="my-1" />

      <CustomSelect
        v-if="appStore.user.jenis === UserJenis.Pemilik && props.action == UserAction.Create"
        v-model="sparePartStore.form.status_pembelian.value"
        :items="Object.values(StatusSparePart)"
        label="Status Pembelian Spare Part"
        placeholder="Pilih Salah Satu"
        :prepend-inner-icon="{
          active: '$purchase-status',
          passive: '$purchase-status-outline',
        }"
        @update:mgasodel-value="
          (val: StatusSparePart) =>
            onFieldChange(sparePartFieldForm.status_pembelian, val)
        "
      />
    </VForm>
  </template>

  <div class="my-4"></div>

  <VBtn
    height="56px"
    block
    color="secondary"
    @click="
    () => {
      (sparePartStore as any)[action](props);
    }
  "
  >
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="tsx">
import {
  merekValidation,
  jenisValidation,
  namaValidation,
  hargaValidation,
  stokValidation,
  statusValidation,
} from '@/action/validation/spare-part'
import CustomGridLayout from '@/components/CustomGridLayout.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { sparePartFieldForm } from '@/models/action-model'
import { DialogAction } from '@/models/app-model'
import { FormattedSparePart, StatusSparePart } from '@/models/spare-part-model'
import { UserAction, UserJenis } from '@/models/user-model'
import { useAppStore } from '@/stores/app-store'
import { useSparePartStore } from '@/stores/spare-part-store'
import { computed, onBeforeMount } from 'vue'

const props = defineProps({
  action: {
    type: String as () => DialogAction,
    required: true,
  },
})

const appStore = useAppStore()
const sparePartStore = useSparePartStore()
const getItem = computed(() => appStore.dialog.item as FormattedSparePart)

const getTitle = computed(() => {
  switch (props.action) {
    case 'create':
      return 'Tambah'
    case 'update':
      return 'Ubah'
    case 'updateStatus':
      return 'Ubah Status'
    case 'konfirmasi':
      return 'Pengajuan Pembelian '
    default:
      return 'Hapus'
  }
})

const getDetails = computed(() => [
  {
    title: 'Merek',
    value: getItem.value.merek,
  },
  {
    title: 'Jenis',
    value: getItem.value.jenis,
  },
  {
    title: 'Nama',
    value: getItem.value.nama,
  },
  {
    title: 'Harga',
    value: getItem.value.harga,
  },
  {
    title: 'Stok',
    value: getItem.value.stok,
  },
  {
    title: 'Status Pembelian',
    value: getItem.value.status_pembelian,
  },
])

const getDetailsUpdateStatus = computed(() => [
  {
    title: 'Merek',
    value: getItem.value.merek,
  },
  {
    title: 'Jenis',
    value: getItem.value.jenis,
  },
  {
    title: 'Nama',
    value: getItem.value.nama,
  },
  {
    title: 'Harga',
    value: getItem.value.harga,
  },
  {
    title: 'Stok',
    value: getItem.value.stok,
  },
])

function onFieldChange(field: sparePartFieldForm, value: string | object) {
  switch (field) {
    case 'merek':
      merekValidation(value as string)
      break
    case 'jenis':
      jenisValidation(value as string)
      break
    case 'nama':
      namaValidation(value as string)
      break
    case 'harga':
      hargaValidation(value as string)
      break
    case 'stok':
      stokValidation(value as string)
      break
    case 'status_pembelian':
      const status = Object.values(StatusSparePart).find((item) => item === value) ?? null
      statusValidation(status)
      break
  }
}

onBeforeMount(() => {
  if (props.action === 'update') {
    const status =
      Object.values(StatusSparePart).find((item) => item === getItem.value.status_pembelian) ?? null

    sparePartStore.form.merek.value = getItem.value.merek
    sparePartStore.form.jenis.value = getItem.value.jenis
    sparePartStore.form.nama.value = getItem.value.nama
    sparePartStore.form.harga.value = getItem.value.harga
    sparePartStore.form.stok.value = getItem.value.stok
    sparePartStore.form.status_pembelian.value = status

    merekValidation(getItem.value.merek)
    jenisValidation(getItem.value.jenis)
    namaValidation(getItem.value.nama)
    hargaValidation(getItem.value.harga)
    stokValidation(getItem.value.stok)
    statusValidation(status)
  }

  if (props.action === 'updateStatus') {
    sparePartStore.form.merek.value = getItem.value.merek
    sparePartStore.form.jenis.value = getItem.value.jenis
    sparePartStore.form.nama.value = getItem.value.nama
    sparePartStore.form.harga.value = getItem.value.harga
    sparePartStore.form.stok.value = getItem.value.stok
    sparePartStore.form.status_pembelian.value = getItem.value.status_pembelian as StatusSparePart

    const status =
      Object.values(StatusSparePart).find((item) => item === getItem.value.status_pembelian) ?? null

    statusValidation(status)
  }
})
</script>
