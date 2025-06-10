<template>
  <VTextField v-model="modelValue" :label="label" :placeholder="placeholder" :prefix="prefix" :clearable="clearable"
    :type="type" :autocomplete="autocomplete" @click:clear="() => (modelValue = '')" @update:focused="
      (focused) => {
        if (!focused) {
          modelValue = modelValue.trim()
        }
      }
    ">
    <template #prepend-inner="{ isFocused }">
      <template v-if="prependInnerIcon">
        <VScaleTransition leave-absolute>
          <VIcon v-if="isFocused.value" :icon="prependInnerIcon.active" />
          <VIcon v-else :icon="prependInnerIcon.passive" />
        </VScaleTransition>
      </template>
    </template>
  </VTextField>
</template>

<script setup lang="ts">
  import { computed, type PropType } from 'vue'

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
    prefix: {
      type: String,
      default: undefined,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<'text' | 'password'>,
      default: 'text',
    },
    autocomplete: {
      type: String as PropType<
        | 'name'
        | 'honorific-prefix'
        | 'given-name'
        | 'additional-name'
        | 'family-name'
        | 'honorific-suffix'
        | 'nickname'
        | 'username'
        | 'new-password'
        | 'current-password'
        | 'one-time-code'
        | 'organization-title'
        | 'organization'
        | 'street-address'
        | 'address-line1'
        | 'address-line2'
        | 'address-line3'
        | 'address-level4'
        | 'address-level3'
        | 'address-level2'
        | 'address-level1'
        | 'postal-code'
        | 'country'
        | 'country-name'
        | 'tel'
        | 'tel-country-code'
        | 'tel-area-code'
        | 'tel-local'
        | 'tel-extension'
        | 'email'
        | 'url'
        | 'date'
        | 'month'
        | 'week'
        | 'time'
        | 'datetime-local'
        | 'range'
        | 'color'
        | 'checkbox'
        | 'radio'
      >,
      default: undefined,
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
