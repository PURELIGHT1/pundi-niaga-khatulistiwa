<template>
  <div :style="getStyle">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
  import { type StyleValue } from 'vue'
  import { computed } from 'vue'

  const props = defineProps({
    gridTemplateColumns: {
      type: String,
      default: undefined,
    },
    gap: {
      type: String,
      default: undefined,
    },
    rowGap: {
      type: String,
      default: undefined,
    },
    columnGap: {
      type: String,
      default: undefined,
    },
    width: {
      type: String,
      default: undefined,
    },
    minWidth: {
      type: String,
      default: undefined,
    },
    maxWidth: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    minHeight: {
      type: String,
      default: undefined,
    },
    maxHeight: {
      type: String,
      default: undefined,
    },
  })

  const getStyle = computed(
    () =>
      ({
        gridTemplateColumns: props.gridTemplateColumns,
        rowGap: props.rowGap ? props.rowGap : props.gap,
        columnGap: props.columnGap ? props.columnGap : props.gap,
        width: props.width,
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        height: props.height,
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
      }) as StyleValue,
  )
</script>

<style scoped>
  div {
    position: relative;
    display: grid;
  }
</style>
