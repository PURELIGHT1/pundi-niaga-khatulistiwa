<template>
  <VLayout class="position-relative mb-8">
    <VBtn
      position="absolute"
      size="32px"
      variant="tonal"
      :elevation="0"
      @click="
        () => {
          pendapatanStore.resetForm()
          appStore.resetDialog()
        }
      "
    >
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} Pendapatan </span>
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

  <template v-else-if="action === 'konfirmasi'">
    <VLayout>
      <VIcon class="pa-1 mx-auto" icon="$info" size="128px" color="surface" />
    </VLayout>

    <VLayout class="d-flex flex-column mt-8 px-4 text-center">
      <span class="text-body-1 text-h6 font-weight-bold">
        {{ pendapatanStore.validateDelete.response.error ?? '' }}
      </span>
    </VLayout>
  </template>

  <!-- ~1~CREATE & UPDATE -->
  <template v-else>
    <VForm>
      <CustomSelect
        v-model="pendapatanStore.form.sopir.value"
        :items="
          sopirStore.sopirs.sort((a, b) =>
            a.nama_lengkap.toLowerCase().localeCompare(b.nama_lengkap.toLowerCase()),
          )
        "
        item-value="id"
        item-title="nama_lengkap"
        :item-props="(item: Sopir) => ({
            title: item.nama_lengkap,
            subtitle: item.nomor_hp,
          })
          "
        label="Sopir"
        placeholder="Pilih Salah Satu"
        :prepend-inner-icon="{ active: '$ship-wheel', passive: '$steering' }"
        return-object
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.sopir, val)"
      />
      <VDivider class="my-1" />

      <VSlideYTransition group>
        <template v-if="pendapatanStore.form.sopir.value">
          <SopirDetailView :sopir="pendapatanStore.form.sopir.value" />
          <VDivider class="my-1" />
        </template>
      </VSlideYTransition>

      <CustomSelect
        v-model="pendapatanStore.form.mobil.value"
        :items="
          mobilStore.mobils.sort((a, b) =>
            a.nomor_polisi.toLowerCase().localeCompare(b.nomor_polisi.toLowerCase()),
          )
        "
        item-value="id"
        item-title="nomor_polisi"
        :item-props="(item: Mobil) => ({ title: item.nomor_polisi, subtitle: item.nama })
          "
        label="Mobil"
        placeholder="Pilih Salah Satu"
        :prepend-inner-icon="{ active: '$car', passive: '$car-outline' }"
        return-object
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.mobil, val)"
      />
      <VDivider class="my-1" />

      <VSlideYTransition group>
        <template v-if="pendapatanStore.form.mobil.value">
          <MobilDetailView :mobil="pendapatanStore.form.mobil.value" />
          <VDivider class="my-1" />
        </template>
      </VSlideYTransition>

      <CustomTextField
        v-model="pendapatanStore.form.spk.value"
        label="SPK"
        placeholder="Maksimal 100 Karakter"
        :prepend-inner-icon="{ active: '$barcode-scan', passive: '$barcode' }"
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.spk, val)"
      />
      <VDivider class="my-1" />

      <CustomDatePicker
        v-model="pendapatanStore.form.tanggal_muat.value"
        title="Tanggal Muat"
        :max="new Date()"
        @update:model-value="(value) => onFieldChange(pendapatanFieldForm.tanggal_muat, value)"
      />
      <VDivider class="my-1" />

      <VSlideYTransition group>
        <template v-if="pendapatanStore.form.tanggal_muat.value">
          <CustomDatePicker
            v-model="pendapatanStore.form.tanggal_bongkar.value"
            title="Tanggal Bongkar"
            :min="new Date(pendapatanStore.form.tanggal_muat.value)"
            :max="new Date()"
            @update:model-value="
              (value) => onFieldChange(pendapatanFieldForm.tanggal_bongkar, value)
            "
          />
          <VDivider class="my-1" />
        </template>
      </VSlideYTransition>

      <CustomTextField
        v-model="pendapatanStore.form.timbangan_muat.value"
        label="Timbangan Muat"
        placeholder="1.000"
        :prepend-inner-icon="{
          active: '$scale-unbalance',
          passive: '$scale-balance',
        }"
        suffix="Kg"
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.timbang_muat, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="pendapatanStore.form.timbangan_bongkar.value"
        label="Timbangan Bongkar"
        placeholder="1.000"
        :prepend-inner-icon="{
          active: '$scale-unbalance',
          passive: '$scale-balance',
        }"
        suffix="Kg"
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.timbang_bongkar, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="pendapatanStore.form.ongkos_angkut.value"
        label="Ongkos Angkut"
        placeholder="100"
        :prepend-inner-icon="{ active: '$truck', passive: '$truck-outline' }"
        prefix="Rp"
        suffix="/Kg"
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.ongkos_angkut, val)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="pendapatanStore.form.harga_klaim_susut.value"
        label="Harga Klaim Susut"
        placeholder="10.000"
        :prepend-inner-icon="{ active: '$cash-100', passive: '$cash' }"
        prefix="Rp"
        @update:model-value="(val) => onFieldChange(pendapatanFieldForm.harga_klaim_susut, val)"
      />
      <VDivider class="my-1" />
    </VForm>
  </template>

  <div class="my-4"></div>

  <VBtn
    height="56px"
    block
    color="secondary"
    @click="
    () => {
      (pendapatanStore as any)[action](props);
    }
  "
  >
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="tsx">
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import CustomGridLayout from '@/components/CustomGridLayout.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { DialogAction } from '@/models/app-model'
import { Mobil } from '@/models/mobil-model'
import { FormattedPendapatan } from '@/models/pendapatan-model'
import { Sopir } from '@/models/sopir-model'
import { useAppStore } from '@/stores/app-store'
import { useMobilStore } from '@/stores/mobil-store'
import { usePendapatanStore } from '@/stores/pendapatan-store'
import { useSopirStore } from '@/stores/sopir-store'
import { parse } from 'date-fns'
import { id } from 'date-fns/locale'
import { computed, onBeforeMount } from 'vue'
import MobilDetailView from '../custom-views/MobilDetailView.vue'
import SopirDetailView from '../custom-views/SopirDetailView.vue'
import { pendapatanFieldForm } from '@/models/action-model'
import {
  mobilValidation,
  sopirValidation,
  SPKValidation,
  tanggalMuatValidation,
  tanggalBongkarValidation,
  timbanganMuatValidation,
  timbanganBongkarValidation,
  ongkosAngkutValidation,
  hargaKlaimSusutValidation,
} from '@/action/validation/pendapatan'

const props = defineProps({
  action: {
    type: String as () => DialogAction,
    required: true,
  },
})

const appStore = useAppStore()
const sopirStore = useSopirStore()
const mobilStore = useMobilStore()
const pendapatanStore = usePendapatanStore()
const getItem = computed(() => appStore.dialog.item as FormattedPendapatan)

const getTitle = computed(() =>
  props.action === 'create'
    ? 'Tambah'
    : props.action === 'update'
      ? 'Ubah'
      : props.action === 'konfirmasi'
        ? 'Konfirmasi Hapus'
        : 'Hapus',
)

const getDetails = computed(() => [
  {
    title: 'Sopir',
    value: getItem.value.sopir,
  },
  {
    title: 'Mobil',
    value: getItem.value.mobil,
  },
  {
    title: 'SPK',
    value: getItem.value.spk,
  },
  {
    title: 'Tanggal Muat',
    value: getItem.value.tanggal_muat,
  },
  {
    title: 'Tanggal Bongkar',
    value: getItem.value.tanggal_bongkar,
  },
  {
    title: 'Timbangan Muat',
    value: getItem.value.timbangan_muat,
  },
  {
    title: 'Timbangan Bongkar',
    value: getItem.value.timbangan_bongkar,
  },
  {
    title: 'Selisih Berat',
    value: getItem.value.selisih_berat,
  },
  {
    title: 'Persen Susut',
    value: getItem.value.persen_susut,
  },
  {
    title: 'Ongkos Angkut',
    value: getItem.value.ongkos_angkut,
  },
  {
    title: 'Harga Klaim Susut',
    value: getItem.value.harga_klaim_susut,
  },
  {
    title: 'Sub Total',
    value: getItem.value.sub_total,
  },
  {
    title: 'Ppn',
    value: getItem.value.ppn,
  },
  {
    title: 'Pph',
    value: getItem.value.pph,
  },
  {
    title: 'Klaim Susut',
    value: getItem.value.klaim_susut,
  },
  {
    title: 'Pendapatan Bruto',
    value: getItem.value.pendapatan_bruto,
  },
])

function onFieldChange(field: pendapatanFieldForm, value: object | string | Date) {
  let tanggalMuat = null
  switch (field) {
    case 'sopir':
      const sopir = (value as Sopir) ?? null
      sopirValidation(sopir)
      break
    case 'mobil':
      const mobil = (value as Mobil) ?? null
      mobilValidation(mobil)
      break
    case 'spk':
      SPKValidation(value as string)
      break
    case 'tanggal_muat':
      tanggalMuat = value ? new Date(value as string) : null
      tanggalMuatValidation(tanggalMuat)
      break
    case 'tanggal_bongkar':
      const tanggalBongkar = value ? new Date(value as string) : null
      tanggalBongkarValidation(tanggalMuat, tanggalBongkar)
      break
    case 'timbang_muat':
      timbanganMuatValidation(value as string)
      break
    case 'timbang_bongkar':
      timbanganBongkarValidation(value as string)
      break
    case 'ongkos_angkut':
      ongkosAngkutValidation(value as string)
      break
    case 'harga_klaim_susut':
      hargaKlaimSusutValidation(value as string)
      break
  }
}
onBeforeMount(() => {
  if (props.action === 'update') {
    const formatString = 'EEEE, dd MMMM yyyy'
    const sopir = sopirStore.sopirs.find((sopir) => sopir.id === getItem.value.id_sopir) ?? null
    const mobil = mobilStore.mobils.find((mobil) => mobil.id === getItem.value.id_mobil) ?? null

    pendapatanStore.form.sopir.value = sopir
    pendapatanStore.form.mobil.value = mobil

    pendapatanStore.form.spk.value = getItem.value.spk

    const tanggalMuat =
      parse(getItem.value.tanggal_muat, formatString, new Date(), {
        locale: id,
      }) ?? null

    const tanggalBongkar =
      parse(getItem.value.tanggal_bongkar, formatString, new Date(), {
        locale: id,
      }) ?? null

    pendapatanStore.form.tanggal_muat.value = tanggalMuat
    pendapatanStore.form.tanggal_bongkar.value = tanggalBongkar
    pendapatanStore.form.timbangan_muat.value = getItem.value.timbangan_muat
    pendapatanStore.form.timbangan_bongkar.value = getItem.value.timbangan_bongkar
    pendapatanStore.form.ongkos_angkut.value = getItem.value.ongkos_angkut
    pendapatanStore.form.harga_klaim_susut.value = getItem.value.harga_klaim_susut

    sopirValidation(sopir)
    mobilValidation(mobil)
    SPKValidation(getItem.value.spk)
    tanggalMuatValidation(tanggalMuat)
    tanggalBongkarValidation(tanggalMuat, tanggalBongkar)
    timbanganMuatValidation(getItem.value.timbangan_muat)
    timbanganBongkarValidation(getItem.value.timbangan_bongkar)
    ongkosAngkutValidation(getItem.value.ongkos_angkut)
    hargaKlaimSusutValidation(getItem.value.harga_klaim_susut)
  }
})
</script>
