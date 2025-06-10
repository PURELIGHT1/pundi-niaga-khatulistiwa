<template>
  <VLayout class="position-relative mb-8">
    <VBtn position="absolute" size="32px" variant="tonal" :elevation="0" @click="
      () => {
        mobilStore.resetForm()
        appStore.resetDialog()
      }
    ">
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} Mobil </span>
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
      <CustomTextField v-model="mobilStore.form.merek.value" label="Merek" placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$car-estate',
          passive: '$car-lifted-pickup',
        }" @update:model-value="(val) => onFieldChange(mobilFieldForm.merk, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="mobilStore.form.jenis.value" label="Jenis" placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$car-settings',
          passive: '$car-cog',
        }" @update:model-value="(val) => onFieldChange(mobilFieldForm.jenis, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="mobilStore.form.nomor_polisi.value" label="Nomor Polisi" placeholder="XX YYYY ZZZ"
        :prepend-inner-icon="{
          active: '$car-search',
          passive: '$car-search-outline',
        }" @update:model-value="(val) => onFieldChange(mobilFieldForm.nomor_polisi, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="mobilStore.form.nama.value" label="Nama" placeholder="Maksimal 50 Karakter"
        :prepend-inner-icon="{
          active: '$car-info',
          passive: '$car-info',
        }" @update:model-value="(val) => onFieldChange(mobilFieldForm.nama, val)" />
      <VDivider class="my-1" />

      <CustomSelect v-model="mobilStore.form.jenis_bbm.value" :items="Object.values(MobilJenisBBM)" label="Jenis BBM"
        placeholder="Pilih Salah Satu" :prepend-inner-icon="{
          active: '$gas-station',
          passive: '$gas-station-outline',
        }" @update:model-value="(val) => onFieldChange(mobilFieldForm.jenis_bbm, val)" />

      <VDivider class="my-1" />

      <CustomSelect v-model="mobilStore.form.warna.value" :items="itemsWarna" label="Warna"
        placeholder="Pilih Salah Satu" :prepend-inner-icon="{
          active: '$palette',
          passive: '$palette-outline',
        }" item-value="value" item-title="value"
        @update:model-value="(val) => onFieldChange(mobilFieldForm.warna, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="mobilStore.form.harga.value" label="Harga" placeholder="100.000.000"
        :prepend-inner-icon="{
          active: '$tag',
          passive: '$tag-outline',
        }" prefix="Rp" @update:model-value="(val) => onFieldChange(mobilFieldForm.harga, val)" />
      <VDivider class="my-1" />

      <CustomTextField v-model="mobilStore.form.biaya_pajak.value" label="Biaya Pajak" placeholder="1.000.000"
        :prepend-inner-icon="{
          active: '$cash-100',
          passive: '$cash',
        }" prefix="Rp" @update:model-value="(val) => onFieldChange(mobilFieldForm.biaya_pajak, val)" />
      <VDivider class="my-1" />

      <CustomDatePicker v-model="mobilStore.form.jatuh_tempo_pajak.value" title="Jatuh Tempo Pajak" :min="new Date()"
        @update:model-value="(val) => onFieldChange(mobilFieldForm.jatuh_tempo_pajak, val)" />
    </VForm>
  </template>

  <div class="my-4"></div>

  <VBtn height="56px" block color="secondary" @click="
    () => {
      (mobilStore as any)[action](props);
    }
  ">
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="ts">
  import {
    biayaPajakValidation,
    hargaValidation,
    jatuhTempoPajakValidation,
    jenisBBMValidation,
    jenisValidation,
    merekValidation,
    namaValidation,
    nomorPolisiValidation,
    warnaValidation,
  } from '@/action/validation/mobil'
  import CustomDatePicker from '@/components/CustomDatePicker.vue'
  import CustomGridLayout from '@/components/CustomGridLayout.vue'
  import CustomSelect from '@/components/CustomSelect.vue'
  import CustomTextField from '@/components/CustomTextField.vue'
  import { mobilFieldForm } from '@/models/action-model'
  import { DialogAction } from '@/models/app-model'
  import { FormattedMobil, MobilJenisBBM, MobilWarna } from '@/models/mobil-model'
  import { useAppStore } from '@/stores/app-store'
  import { useMobilStore } from '@/stores/mobil-store'
  import { parse } from 'date-fns'
  import { id } from 'date-fns/locale'
  import { computed, onBeforeMount } from 'vue'

  const props = defineProps({
    action: {
      type: String as () => DialogAction,
      required: true,
    },
  })

  const appStore = useAppStore()
  const mobilStore = useMobilStore()
  const getItem = computed(() => appStore.dialog.item as FormattedMobil)

  const getTitle = computed(() =>
    props.action === 'create' ? 'Tambah' : props.action === 'update' ? 'Ubah' : 'Hapus',
  )

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
      title: 'Nomor Polisi',
      value: getItem.value.nomor_polisi,
    },
    {
      title: 'Nama',
      value: getItem.value.nama,
    },
    {
      title: 'Jenis BBM',
      value: getItem.value.jenis_bbm,
    },
    {
      title: 'Warna',
      value: getItem.value.warna,
    },
    {
      title: 'Harga',
      value: getItem.value.harga,
    },
    {
      title: 'Biaya Pajak',
      value: getItem.value.biaya_pajak,
    },
    {
      title: 'Jatuh Tempo Pajak',
      value: getItem.value.jatuh_tempo_pajak,
    },
    {
      title: 'Jumlah Pengeluaran',
      value: getItem.value.jumlah_pengeluaran,
    },
    {
      title: 'Jumlah Penggunaan',
      value: getItem.value.jumlah_penggunaan,
    },
  ])

  const itemsWarna = [...MobilWarna]

  function onFieldChange(field: mobilFieldForm, value: string) {
    switch (field) {
      case 'merk':
        merekValidation(value)
        break
      case 'jenis':
        jenisValidation(value)
        break
      case 'nomor_polisi':
        nomorPolisiValidation(value)
        break
      case 'nama':
        namaValidation(value)
        break
      case 'jenis_bbm':
        const jenisBBM = Object.values(MobilJenisBBM).find((item) => item === value) ?? null
        jenisBBMValidation(jenisBBM)
        break
      case 'warna':
        warnaValidation(value)
        break
      case 'harga':
        hargaValidation(value)
        break
      case 'biaya_pajak':
        biayaPajakValidation(value)
        break
      case 'jatuh_tempo_pajak':
        const jatuhTempo = value ? new Date(value) : null
        jatuhTempoPajakValidation(jatuhTempo)
        break
    }
  }

  onBeforeMount(() => {
    if (props.action === 'update') {
      const formatString = 'EEEE, dd MMMM yyyy'

      mobilStore.form.merek.value = getItem.value.merek
      mobilStore.form.jenis.value = getItem.value.jenis
      mobilStore.form.nomor_polisi.value = getItem.value.nomor_polisi
      mobilStore.form.nama.value = getItem.value.nama
      mobilStore.form.jenis_bbm.value = getItem.value.jenis_bbm as MobilJenisBBM
      mobilStore.form.warna.value = getItem.value.warna
      mobilStore.form.harga.value = getItem.value.harga
      mobilStore.form.biaya_pajak.value = getItem.value.biaya_pajak

      const jatuhTempoPajak =
        parse(getItem.value.jatuh_tempo_pajak, formatString, new Date(), {
          locale: id,
        }) ?? null
      mobilStore.form.jatuh_tempo_pajak.value = jatuhTempoPajak

      merekValidation(getItem.value.merek)
      jenisValidation(getItem.value.jenis)
      nomorPolisiValidation(getItem.value.nomor_polisi)
      namaValidation(getItem.value.nama)

      const jenisBBM =
        Object.values(MobilJenisBBM).find((item) => item === getItem.value.jenis_bbm) ?? null
      jenisBBMValidation(jenisBBM)

      warnaValidation(getItem.value.warna)

      hargaValidation(getItem.value.harga)
      biayaPajakValidation(getItem.value.biaya_pajak)

      jatuhTempoPajakValidation(jatuhTempoPajak)
    }
  })
</script>
