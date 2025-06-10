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
    <span class="font-weight-medium"> Nama Lengkap </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ sopir.nama_lengkap }} </span>

    <span class="font-weight-medium"> Nomor HP </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ sopir.nomor_hp }} </span>

    <span class="font-weight-medium"> Nomor SIM </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ sopir.nomor_sim }} </span>

    <span class="font-weight-medium"> Asal PKS </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ sopir.asal_pks }} </span>

    <span class="font-weight-medium"> Tujuan PKS </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ sopir.tujuan_pks }} </span>

    <span class="font-weight-medium"> Uang Minyak </span>
    <span> &nbsp;:&nbsp; </span>
    <span> {{ sopir.uang_minyak }} </span>
  </VCard>
</template>

<script setup lang="ts">
import { Sopir } from '@/models/sopir-model'
import { PropType } from 'vue'

defineProps({
  sopir: {
    type: Object as PropType<Sopir>,
    required: true,
  },
})
</script>
