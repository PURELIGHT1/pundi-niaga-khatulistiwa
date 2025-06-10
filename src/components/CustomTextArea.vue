<template>
  <VTextarea
    v-model="modelValue"
    :label="label"
    :placeholder="placeholder"
    :clearable="clearable"
    @click:clear="() => (modelValue = '')"
    @update:focused="
      (focused) => {
        if (!focused) {
          modelValue = modelValue.trim()
        }
      }
    "
  >
    <template v-if="counter" #append-inner>
      <span class="text-body-2 font-weight-bold text-no-wrap">
        {{ modelValue.length }}
      </span>
    </template>

    <template #prepend-inner="{ isFocused }">
      <template v-if="prependInnerIcon">
        <VScaleTransition leave-absolute>
          <VIcon v-if="isFocused.value" :icon="prependInnerIcon.active" />
          <VIcon v-else :icon="prependInnerIcon.passive" />
        </VScaleTransition>
      </template>
    </template>
  </VTextarea>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
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
  clearable: {
    type: Boolean,
    default: false,
  },
  counter: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:model-value'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emits('update:model-value', value)
  },
})
</script>
