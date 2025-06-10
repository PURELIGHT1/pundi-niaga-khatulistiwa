<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
    <VLayout v-if="appStore.active.child" class="d-scroll pa-2 overflow-auto" width="0px" min-height="fit-content"
      max-height="100vh">
      <VLayout class="d-flex flex-column mt-8">
        <VForm class="mb-2 d-flex">
          <CustomSelect v-model="ritaseStore.inputYear" :items="YEAR_OPTIONS" label="Tahun"
            placeholder="Pilih Salah Satu" :prepend-inner-icon="{
              active: '$calendar',
              passive: '$calendar-outline',
            }" clearable @update:model-value="ritaseStore.inputMonth = null" />

          <VSlideXTransition group>
            <div v-if="ritaseStore.inputYear" class="d-flex align-center">
              <VDivider class="mx-1" vertical />
              <CustomSelect v-model="ritaseStore.inputMonth" :items="MONTH_OPTIONS" item-title="title"
                item-value="value" label="Bulan" placeholder="Pilih Salah Satu" :prepend-inner-icon="{
                  active: '$calendar-month',
                  passive: '$calendar-month-outline',
                }" clearable />
            </div>
          </VSlideXTransition>
        </VForm>

        <CustomGridLayout grid-template-columns="repeat(3, 1fr)" gap="8px" width="100%">
          <VCard v-for="(item, i) in ritaseStore.getSparklineItems" :key="i" min-width="360px" min-height="240px">
            <CustomChart v-if="item.options" class="pt-2" :options="item.options" />
            <VSkeletonLoader v-else :type="['ossein']" height="240px" />
          </VCard>

          <VCard v-for="(item, i) in ritaseStore.getChartItems" :key="i" class="pa-2" style="grid-column: span 3"
            min-width="360px" min-height="575px">
            <VForm class="mb-2 d-flex">
              <CustomSelect v-model="item.inputModel.value" :items="item.items" :label="item.label"
                placeholder="Pilih Salah Satu" :prepend-inner-icon="item.icon" />
              <VDivider class="mx-1" vertical />

              <VFadeTransition group>
                <template v-if="
                  (item.model === 'sopir' &&
                    [
                      RitaseSopirType.JumlahPendapatan,
                      RitaseSopirType.JumlahPengiriman,
                    ].includes(item.inputModel.value as RitaseSopirType)) ||
                  (item.model === 'mobil' &&
                    [
                      RitaseMobilType.JumlahPendapatan,
                      // RitaseMobilType.JumlahPengeluaran,
                      RitaseMobilType.JumlahPenggunaan,
                    ].includes(item.inputModel.value as RitaseMobilType))
                ">
                  <CustomSelect v-model="item.inputYear.value" :items="YEAR_OPTIONS" label="Tahun"
                    placeholder="Pilih Salah Satu" :prepend-inner-icon="{
                      active: '$calendar',
                      passive: '$calendar-outline',
                    }" clearable @update:model-value="item.inputMonth.value = null" />

                  <template v-if="item.inputYear.value">
                    <VDivider class="mx-1" vertical />
                    <CustomSelect v-model="item.inputMonth.value" :items="MONTH_OPTIONS" item-title="title"
                      item-value="value" label="Bulan" placeholder="Pilih Salah Satu" :prepend-inner-icon="{
                        active: '$calendar-month',
                        passive: '$calendar-month-outline',
                      }" clearable />
                  </template>
                  <VDivider class="mx-1" vertical />
                </template>
              </VFadeTransition>

              <CustomSelect v-model="item.chartType.value" :items="Object.values(RitaseChartType)" label="Tipe Grafik"
                placeholder="Pilih Salah Satu" :prepend-inner-icon="{
                  active: '$chart-box',
                  passive: '$chart-box-outline',
                }" />
            </VForm>

            <CustomChart v-if="item.options" class="pt-2" :options="item.options"
              :number-format-style="item.numberFormatStyle" />
            <VSkeletonLoader v-else :type="['ossein']" height="480px" />
          </VCard>
        </CustomGridLayout>
      </VLayout>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
  import CustomChart from '@/components/CustomChart.vue'
  import CustomGridLayout from '@/components/CustomGridLayout.vue'
  import CustomSelect from '@/components/CustomSelect.vue'
  import {
    MONTH_OPTIONS,
    // WORKER_ERROR_MESSAGE,
    YEAR_OPTIONS,
  } from '@/models/app-model'
  import { Mobil } from '@/models/mobil-model'
  import { Pendapatan } from '@/models/pendapatan-model'
  import { Pengeluaran } from '@/models/pengeluaran-model'
  import { RitaseSopirType, RitaseChartType, RitaseMobilType } from '@/models/ritase-model'
  import { Sopir } from '@/models/sopir-model'
  import { useAppStore } from '@/stores/app-store'
  import { useMobilStore } from '@/stores/mobil-store'
  import { usePendapatanStore } from '@/stores/pendapatan-store'
  import { usePengeluaranStore } from '@/stores/pengeluaran-store'
  import { useRitaseStore } from '@/stores/ritase-store'
  import { useSopirStore } from '@/stores/sopir-store'
  import { nextTick, watch } from 'vue'

  const appStore = useAppStore()
  const sopirStore = useSopirStore()
  const mobilStore = useMobilStore()
  const pendapatanStore = usePendapatanStore()
  const pengeluaranStore = usePengeluaranStore()
  const ritaseStore = useRitaseStore()

  watch(
    () => [
      pendapatanStore.pendapatans,
      pengeluaranStore.pengeluarans,
      ritaseStore.inputYear,
      ritaseStore.inputMonth,
    ],
    (values) => {
      if ((values[0] as Pendapatan[]).length > 0 && (values[1] as Pengeluaran[]).length > 0)
        if (ritaseStore.worker) {
          ; (ritaseStore.worker as Worker).terminate()
          ritaseStore.worker = null
        }

      if (window.Worker) {
        ritaseStore.pendapatanOptions = null
        ritaseStore.pengeluaranOptions = null
        ritaseStore.keuntunganOptions = null

        ritaseStore.worker = new Worker(new URL('@/workers/ritase-worker.ts', import.meta.url), {
          type: 'module',
        })

          ; (ritaseStore.worker as Worker).onmessage = (event) => {
            ritaseStore.pendapatanOptions = JSON.parse(event.data.pendapatanOptions)
            ritaseStore.pengeluaranOptions = JSON.parse(event.data.pengeluaranOptions)
            ritaseStore.keuntunganOptions = JSON.parse(event.data.keuntunganOptions)

            nextTick(() => {
              appStore.loading = false
            })
          }

          ; (ritaseStore.worker as Worker).postMessage({
            pendapatans: JSON.stringify(values[0]),
            pengeluarans: JSON.stringify(values[1]),
            inputYear: ritaseStore.inputYear,
            inputMonth: ritaseStore.inputMonth,
          })
      } else {
        // console.error(WORKER_ERROR_MESSAGE);
      }
    },
    { immediate: true, deep: true },
  )

  watch(
    () => [
      pendapatanStore.pendapatans,
      sopirStore.sopirs,
      ritaseStore.sopir.inputSopir,
      ritaseStore.sopir.inputYear,
      ritaseStore.sopir.inputMonth,
      ritaseStore.sopir.chartType,
    ],
    (values) => {
      if ((values[0] as Pendapatan[]).length > 0 && (values[1] as Sopir[]).length > 0)
        if (ritaseStore.sopir.worker) {
          ; (ritaseStore.sopir.worker as Worker).terminate()
          ritaseStore.sopir.worker = null
        }

      if (window.Worker) {
        ritaseStore.sopir.options = null
        ritaseStore.sopir.numberFormatStyle = 'currency'

        ritaseStore.sopir.worker = new Worker(
          new URL('@/workers/ritase-sopir-worker.ts', import.meta.url),
          { type: 'module' },
        )

          ; (ritaseStore.sopir.worker as Worker).onmessage = (event) => {
            ritaseStore.sopir.options = JSON.parse(event.data.options)
            ritaseStore.sopir.numberFormatStyle = event.data.numberFormatStyle

            nextTick(() => {
              appStore.loading = false
            })
          }

          ; (ritaseStore.sopir.worker as Worker).postMessage({
            pendapatans: JSON.stringify(values[0]),
            sopirs: JSON.stringify(values[1]),
            inputSopir: ritaseStore.sopir.inputSopir,
            inputYear: ritaseStore.sopir.inputYear,
            inputMonth: ritaseStore.sopir.inputMonth,
            chartType: ritaseStore.sopir.chartType,
          })
      } else {
        // console.error(WORKER_ERROR_MESSAGE);
      }
    },
    { immediate: true, deep: true },
  )

  watch(
    () => [
      pendapatanStore.pendapatans,
      pengeluaranStore.pengeluarans,
      mobilStore.mobils,
      ritaseStore.mobil.inputMobil,
      ritaseStore.mobil.inputYear,
      ritaseStore.mobil.inputMonth,
      ritaseStore.mobil.chartType,
    ],
    (values) => {
      if (
        (values[0] as Pendapatan[]).length > 0 &&
        (values[1] as Pengeluaran[]).length > 0 &&
        (values[2] as Mobil[]).length > 0
      )
        if (ritaseStore.mobil.worker) {
          ; (ritaseStore.mobil.worker as Worker).terminate()
          ritaseStore.mobil.worker = null
        }

      if (window.Worker) {
        ritaseStore.mobil.options = null
        ritaseStore.mobil.numberFormatStyle = 'currency'

        ritaseStore.mobil.worker = new Worker(
          new URL('@/workers/ritase-mobil-worker.ts', import.meta.url),
          { type: 'module' },
        )

          ; (ritaseStore.mobil.worker as Worker).onmessage = (event) => {
            ritaseStore.mobil.options = JSON.parse(event.data.options)
            ritaseStore.mobil.numberFormatStyle = event.data.numberFormatStyle

            nextTick(() => {
              appStore.loading = false
            })
          }

          ; (ritaseStore.mobil.worker as Worker).postMessage({
            pendapatans: JSON.stringify(values[0]),
            //pengeluarans: JSON.stringify(values[1]),
            mobils: JSON.stringify(values[2]),
            inputMobil: ritaseStore.mobil.inputMobil,
            inputYear: ritaseStore.mobil.inputYear,
            inputMonth: ritaseStore.mobil.inputMonth,
            chartType: ritaseStore.mobil.chartType,
          })
      } else {
        // console.error(WORKER_ERROR_MESSAGE);
      }
    },
    { immediate: true, deep: true },
  )
</script>
