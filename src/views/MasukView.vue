<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
    <VLayout v-if="appStore.active.parent" class="pa-8" full-height>
      <VCard class="ma-auto pa-8 d-flex flex-column" width="512px" color="primary" elevation="4" rounded="xl">
        <span class="text-h4 font-weight-bold text-center"> MASUK SISTEM </span>

        <VCard class="mx-auto my-8" width="144px" height="144px" rounded="lg">
          <VImg :src="LOGO" :lazy-src="LOGO" />
        </VCard>

        <VForm>
          <CustomTextField v-model="userStore.form.email.value" label="Email" placeholder="example@example.com"
            :prepend-inner-icon="{
              active: '$email',
              passive: '$email-outline',
            }" autocomplete="email" @update:model-value="(val) => emailValidation(val)" />

          <VDivider class="my-2" />

          <CustomTextField v-model="userStore.form.kata_sandi.value" label="Kata Sandi" placeholder="Minimal 6 Karakter"
            :prepend-inner-icon="{ active: '$lock', passive: '$lock-outline' }" type="password"
            autocomplete="current-password" @update:model-value="(val) => kataSandiValidation(val)" />
        </VForm>

        <VDivider class="my-4" />

        <VBtn class="ml-auto" height="56px" width="168px" color="secondary" @click="userStore.login()">
          Kirim
        </VBtn>
      </VCard>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
  import LOGO from '@/assets/logo.svg'
  import CustomTextField from '@/components/CustomTextField.vue'
  import { useAppStore } from '@/stores/app-store'
  import { useUserStore } from '@/stores/user-store'
  import { emailValidation, kataSandiValidation } from '@/action/validation/user'
  import { watch } from 'vue'

  const appStore = useAppStore()
  const userStore = useUserStore()

  watch(
    () => appStore.active.parent,
    (value) => {
      if (value) {
        appStore.loading = false
      }
    },
    { immediate: true },
  )
</script>
