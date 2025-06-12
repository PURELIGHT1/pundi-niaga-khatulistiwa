<template>
  <VLayout class="position-relative mb-8">
    <VBtn
      position="absolute"
      size="32px"
      variant="tonal"
      :elevation="0"
      @click="
        () => {
          pengeluaranStore.resetForm()
          appStore.resetDialog()
        }
      "
    >
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} Pengeluaran </span>
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

  <!-- ~1~CREATE & UPDATE -->
  <template v-else>
    <VForm>
      <CustomSelect
        v-model="pengeluaranStore.form.tipe.value"
        :items="Object.values(PengeluaranType)"
        label="Tipe Pengeluaran"
        placeholder="Pilih Salah Satu"
        :prepend-inner-icon="{ active: '$car', passive: '$car-outline' }"
        @update:model-value="(value) => onFieldChange(pengeluaranFieldForm.tipe, value)"
        :disabled="props.action === 'update'"
      />
      <VDivider class="my-1" />

      <VSlideYTransition>
        <template v-if="pengeluaranStore.form.tipe.value === PengeluaranType.Mobil">
          <CustomSelect
            v-model="pengeluaranStore.form.mobil.value"
            :items="
              mobilStore.mobils.sort((a, b) =>
                a.nomor_polisi.toLowerCase().localeCompare(b.nomor_polisi.toLowerCase()),
              )
            "
            item-value="id"
            item-title="nomor_polisi"
            :item-props="
              (item: Mobil) => ({
                title: item.nomor_polisi,
                subtitle: item.nama,
              })
            "
            label="Mobil"
            placeholder="Pilih Salah Satu"
            :prepend-inner-icon="{ active: '$car', passive: '$car-outline' }"
            return-object
            @update:model-value="(value) => onFieldChange(pengeluaranFieldForm.mobil, value)"
          />
          <VDivider class="my-1" />

          <template v-if="pengeluaranStore.form.mobil.value">
            <MobilDetailView :mobil="pengeluaranStore.form.mobil.value" />
            <VDivider class="my-1" />
          </template>
        </template>
      </VSlideYTransition>
      <VDivider class="my-1" />

      <CustomTextArea
        v-model="pengeluaranStore.form.keterangan.value"
        label="Keterangan"
        placeholder="Maksimal 500 Karakter"
        :prepend-inner-icon="{
          active: '$text-box',
          passive: '$text-box-outline',
        }"
        clearable
        counter
        @update:model-value="(value) => onFieldChange(pengeluaranFieldForm.keterangan, value)"
      />
      <VDivider class="my-1" />

      <CustomTextField
        v-model="pengeluaranStore.form.biaya.value"
        label="Biaya"
        placeholder="1.000.000"
        :prepend-inner-icon="{
          active: '$cash-100',
          passive: '$cash-minus',
        }"
        prefix="Rp"
        @update:model-value="(value) => onFieldChange(pengeluaranFieldForm.biaya, value)"
      />
      <VDivider class="my-1" />

      <CustomDatePicker
        v-model="pengeluaranStore.form.tanggal.value"
        title="Tanggal"
        :max="new Date()"
        @update:model-value="(value) => onFieldChange(pengeluaranFieldForm.tanggal, value)"
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
        ;(pengeluaranStore as any)[action](props)
      }
    "
  >
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="ts">
import CustomGridLayout from '@/components/CustomGridLayout.vue'
import CustomTextArea from '@/components/CustomTextArea.vue'
import type { DialogAction } from '@/models/app-model'
import { type FormattedPengeluaran, PengeluaranType } from '@/models/pengeluaran-model'
import { useAppStore } from '@/stores/app-store'
import { usePengeluaranStore } from '@/stores/pengeluaran-store'
import { parse } from 'date-fns'
import { id } from 'date-fns/locale'
import { computed, onBeforeMount } from 'vue'
import CustomTextField from '@/components/CustomTextField.vue'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import { useMobilStore } from '@/stores/mobil-store'
import {
  biayaValidation,
  keteranganValidation,
  mobilValidation,
  tanggalValidation,
  tipeValidation,
} from '@/action/validation/pengeluaran'
import { pengeluaranFieldForm } from '@/models/action-model'
import type { Mobil } from '@/models/mobil-model'

const props = defineProps({
  action: {
    type: String as () => DialogAction,
    required: true,
  },
})

const appStore = useAppStore()
const mobilStore = useMobilStore()
const pengeluaranStore = usePengeluaranStore()
const getItem = computed(() => appStore.dialog.item as FormattedPengeluaran)

const getTitle = computed(() =>
  props.action === 'create' ? 'Tambah' : props.action === 'update' ? 'Ubah' : 'Hapus',
)

const getDetails = computed(() => [
  {
    title: 'Mobil',
    value: getItem.value.mobil,
  },
  {
    title: 'Tipe',
    value: getItem.value.tipe,
  },
  {
    title: 'Keterangan',
    value: getItem.value.keterangan,
  },
  {
    title: 'Biaya',
    value: getItem.value.biaya,
  },
  {
    title: 'Tanggal',
    value: getItem.value.tanggal,
  },
])

function onFieldChange(field: pengeluaranFieldForm, value: object | string | Date) {
  const tipe = null
  switch (field) {
    case 'tipe':
      tipeValidation(value as PengeluaranType)
      break
    case 'mobil':
      const mobil = (value as Mobil) ?? null
      mobilValidation(tipe, mobil)
      break
    case 'keterangan':
      keteranganValidation(value as string)
      break
    case 'biaya':
      biayaValidation(value as string)
      break
    case 'tanggal':
      const tanggal = value ? new Date(value as string) : null
      tanggalValidation(tanggal)
      break
  }
}

onBeforeMount(() => {
  if (props.action === 'update') {
    const formatString = 'EEEE, dd MMMM yyyy'

    const mobil = mobilStore.mobils.find((mobil) => mobil.id === getItem.value.id_mobil) ?? null

    const tanggal =
      parse(getItem.value.tanggal, formatString, new Date(), {
        locale: id,
      }) ?? null

    const tipe = Object.values(PengeluaranType).find((item) => item === getItem.value.tipe) ?? null

    pengeluaranStore.form.tipe.value = tipe
    pengeluaranStore.form.mobil.value = mobil
    pengeluaranStore.form.keterangan.value = getItem.value.keterangan
    pengeluaranStore.form.biaya.value = getItem.value.biaya
    pengeluaranStore.form.tanggal.value = parse(getItem.value.tanggal, formatString, new Date(), {
      locale: id,
    })

    tipeValidation(tipe)
    mobilValidation(tipe, mobil)
    keteranganValidation(getItem.value.keterangan)
    biayaValidation(getItem.value.biaya)
    tanggalValidation(tanggal)
  }
})
</script>
