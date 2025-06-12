<template>
  <VLayout min-height="100vh" height="100%">
    <RouterView class="ma-auto" />
  </VLayout>

  <VOverlay
    class="d-flex align-center justify-center"
    :model-value="appStore.loading"
    persistent
    :z-index="100000"
  >
    <VProgressCircular indeterminate :size="64" :width="8" color="secondary" />
  </VOverlay>

  <Transition name="alert">
    <VCard
      v-if="appStore.alerts.length > 0"
      class="pa-2 overflow-auto"
      style="z-index: 90000"
      color="transparent"
      position="fixed"
      width="410px"
      min-height="fit-content"
      max-height="100%"
      location="top end"
    >
      <TransitionGroup name="alert-list">
        <template v-for="alert in appStore.alerts" :key="alert.id">
          <VCard variant="flat" color="surface">
            <VAlert
              class="text-pre-wrap"
              :type="alert.type"
              :title="alert.title"
              :text="alert.message"
              variant="tonal"
              border="start"
            />
          </VCard>

          <VDivider class="mt-2" />
        </template>
      </TransitionGroup>
    </VCard>
  </Transition>

  <VDialog :model-value="appStore.dialog.show" persistent>
    <VCard class="ma-auto pa-8 d-flex flex-column" width="512px" color="primary" elevation="4">
      <component :is="appStore.dialog.component" v-bind="appStore.dialog.props" />
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/app-store'

const appStore = useAppStore()
</script>
