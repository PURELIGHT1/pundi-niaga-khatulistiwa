<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
  </VFadeTransition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app-store'
import { watch } from 'vue'

const appStore = useAppStore()

watch(
  () => appStore.active.child,
  (value) => {
    if (value) {
      appStore.loading = false
    }
  },
  { immediate: true },
)
</script>
