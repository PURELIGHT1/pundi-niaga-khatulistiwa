<template>
  <VDatePicker
    v-model="modelValue"
    :title="title"
    :min="min ? new Date(min) : undefined"
    :max="max ? new Date(max) : undefined"
  >
    <template #header>
      <VLayout class="pl-6 pr-4 pb-4">
        <span v-if="modelValue" class="text-h5 font-weight-bold">
          {{ new Date(modelValue).toLocaleDateString('id', { dateStyle: 'full' }) }}
        </span>
      </VLayout>
    </template>
  </VDatePicker>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date as PropType<Date | null>,
    default: null,
  },
  title: {
    type: String,
    default: undefined,
  },
  min: {
    type: Date,
    default: undefined,
  },
  max: {
    type: Date,
    default: undefined,
  },
})

const emits = defineEmits(['update:model-value'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: Date | null) => {
    emits('update:model-value', value)
  },
})
</script>
