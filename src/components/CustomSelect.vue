<template>
  <VSelect
    v-model="modelValue"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :item-props="itemProps"
    :label="label"
    :placeholder="placeholder"
    :prefix="prefix"
    :return-object="returnObject"
    :clearable="clearable"
  >
    <template #prepend-inner="{ isFocused }">
      <template v-if="prependInnerIcon">
        <VScaleTransition leave-absolute>
          <VIcon v-if="isFocused.value" :icon="prependInnerIcon.active" />
          <VIcon v-else :icon="prependInnerIcon.passive" />
        </VScaleTransition>
      </template>
    </template>
  </VSelect>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array, Boolean, null, undefined] as PropType<any>,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  itemTitle: {
    type: String,
    default: undefined,
  },
  itemValue: {
    type: String,
    default: undefined,
  },
  itemProps: {
    type: Function as PropType<any>,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  prependInnerIcon: {
    type: Object as PropType<{ active: string; passive: string }>,
    default: undefined,
  },
  prefix: {
    type: String,
    default: undefined,
  },
  returnObject: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:model-value'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: any) => {
    emits('update:model-value', value)
  },
})
</script>
