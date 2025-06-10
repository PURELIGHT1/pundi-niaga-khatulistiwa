<template>
  <VLayout class="position-relative mb-8">
    <VBtn position="absolute" size="32px" variant="tonal" :elevation="0" @click="
      () => {
        sopirStore.resetForm()
        appStore.resetDialog()
      }
    ">
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} Sopir </span>
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
      <CustomTextField v-model="sopirStore.form.nama_lengkap.value" label="Nama Lengkap"
        placeholder="Maksimal 50 Karakter" :prepend-inner-icon="{
          active: '$account',
          passive: '$account-outline',
        }" autocomplete="name" @update:model-value="(val) => onFieldChange(sopirFieldForm.nama_lengkap, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="sopirStore.form.nomor_hp.value" label="Nomor HP" placeholder="8XX-XXXX-XXXX"
        :prepend-inner-icon="{
          active: '$phone',
          passive: '$phone-outline',
        }" prefix="+62" @update:model-value="(val) => onFieldChange(sopirFieldForm.nomor_hp, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="sopirStore.form.nomor_sim.value" label="Nomor SIM" placeholder="XXXX-XXXX-XXXXXX"
        :prepend-inner-icon="{
          active: '$card-account-details',
          passive: '$card-account-details-outline',
        }" @update:model-value="(val) => onFieldChange(sopirFieldForm.nomor_sim, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="sopirStore.form.asal_pks.value" label="Asal PKS" placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$office-building',
          passive: '$office-building-outline',
        }" autocomplete="organization-title"
        @update:model-value="(val) => onFieldChange(sopirFieldForm.asal_pks, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="sopirStore.form.tujuan_pks.value" label="Tujuan PKS" placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$office-building-marker',
          passive: '$office-building-marker-outline',
        }" autocomplete="organization-title"
        @update:model-value="(val) => onFieldChange(sopirFieldForm.tujuan_pks, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="sopirStore.form.uang_minyak.value" label="Uang Minyak" placeholder="500.000"
        :prepend-inner-icon="{
          active: '$account-cash',
          passive: '$account-cash-outline',
        }" prefix="Rp" @update:model-value="(val) => onFieldChange(sopirFieldForm.uang_minyak, val)" />
    </VForm>
  </template>

  <div class="my-4"></div>

  <VBtn height="56px" block color="secondary" @click="
    () => {
      (sopirStore as any)[action](props);
    }
  ">
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="ts">
  import CustomGridLayout from '@/components/CustomGridLayout.vue'
  import CustomTextField from '@/components/CustomTextField.vue'
  import { DialogAction } from '@/models/app-model'
  import { FormattedSopir } from '@/models/sopir-model'
  import { useAppStore } from '@/stores/app-store'
  import { useSopirStore } from '@/stores/sopir-store'
  import {
    namaLengkapValidation,
    nomorHpValidation,
    nomorSIMValidation,
    asalPKSValidation,
    tujuanPKSValidation,
    uangMinyakValidation,
  } from '@/action/validation/sopir'
  import { computed, onBeforeMount } from 'vue'
  import { sopirFieldForm } from '@/models/action-model'

  const props = defineProps({
    action: {
      type: String as () => DialogAction,
      required: true,
    },
  })

  const appStore = useAppStore()
  const sopirStore = useSopirStore()
  const getItem = computed(() => appStore.dialog.item as FormattedSopir)

  const getTitle = computed(() =>
    props.action === 'create' ? 'Tambah' : props.action === 'update' ? 'Ubah' : 'Hapus',
  )

  const getDetails = computed(() => [
    {
      title: 'Nama Lengkap',
      value: getItem.value.nama_lengkap,
    },
    {
      title: 'Nomor HP',
      value: getItem.value.nomor_hp,
    },
    {
      title: 'Nomor SIM',
      value: getItem.value.nomor_sim,
    },
    {
      title: 'Asal PKS',
      value: getItem.value.asal_pks,
    },
    {
      title: 'Tujuan PKS',
      value: getItem.value.tujuan_pks,
    },
    {
      title: 'Uang Minyak',
      value: getItem.value.uang_minyak,
    },
    {
      title: 'Jumlah Pendapatan',
      value: getItem.value.jumlah_pendapatan,
    },
    {
      title: 'Jumlah Pengiriman',
      value: getItem.value.jumlah_pengiriman,
    },
  ])

  function onFieldChange(field: sopirFieldForm, value: string) {
    sopirStore.form[field].value = value

    switch (field) {
      case 'nama_lengkap':
        namaLengkapValidation(value)
        break
      case 'nomor_hp':
        nomorHpValidation(value)
        break
      case 'nomor_sim':
        nomorSIMValidation(value)
        break
      case 'asal_pks':
        asalPKSValidation(value)
        break
      case 'tujuan_pks':
        tujuanPKSValidation(value)
        break
      case 'uang_minyak':
        uangMinyakValidation(value)
        break
    }
  }

  onBeforeMount(() => {
    if (props.action === 'update') {
      sopirStore.form.nama_lengkap.value = getItem.value.nama_lengkap
      sopirStore.form.nomor_hp.value = getItem.value.nomor_hp
      sopirStore.form.nomor_sim.value = getItem.value.nomor_sim
      sopirStore.form.asal_pks.value = getItem.value.asal_pks
      sopirStore.form.tujuan_pks.value = getItem.value.tujuan_pks
      sopirStore.form.uang_minyak.value = getItem.value.uang_minyak

      namaLengkapValidation(getItem.value.nama_lengkap)
      nomorHpValidation(getItem.value.nomor_hp)
      nomorSIMValidation(getItem.value.nomor_sim)
      asalPKSValidation(getItem.value.asal_pks)
      tujuanPKSValidation(getItem.value.tujuan_pks)
      uangMinyakValidation(getItem.value.uang_minyak)
    }
  })
</script>
