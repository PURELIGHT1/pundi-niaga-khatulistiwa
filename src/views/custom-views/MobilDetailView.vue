<template>
  <VCard
    class="pa-3"
    style="
      display: grid;
      grid-template-columns: auto auto minmax(0px, 1fr);
      width: 100%;
      align-self: center;
      overflow: auto;
    "
    variant="flat"
    rounded="xl"
  >
    <span class="font-weight-medium"> Nomor Polisi </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ mobil.nomor_polisi }} </span>

    <span class="font-weight-medium"> Merek Mobil </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ mobil.merek }} </span>

    <span class="font-weight-medium"> Jenis Mobil </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ mobil.jenis }} </span>

    <span class="font-weight-medium"> Nama </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ mobil.nama }} </span>

    <span class="font-weight-medium"> Jenis BBM </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ mobil.jenis_bbm }} </span>

    <span class="font-weight-medium"> Warna </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ mobil.warna }} </span>

    <span class="font-weight-medium"> Harga </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ i18n.global.n(mobil.harga, 'currency', 'id') }} </span>

    <span class="font-weight-medium"> Biaya Pajak </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ i18n.global.n(mobil.biaya_pajak, 'currency', 'id') }} </span>

    <span class="font-weight-medium"> Jatuh Tempo Pajak </span>
    <span> &nbsp;:&nbsp; </span>
    <span>
      {{
        new Date(mobil.jatuh_tempo_pajak).toLocaleDateString('id', {
          dateStyle: 'full',
        })
      }}
    </span>
  </VCard>
</template>

<script setup lang="ts">
import type { Mobil } from '@/models/mobil-model'
import i18n from '@/plugins/i18n'
import type { PropType } from 'vue'

defineProps({
  mobil: {
    type: Object as PropType<Mobil>,
    required: true,
  },
})
</script>
