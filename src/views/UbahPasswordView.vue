<!-- eslint-disable vue/valid-v-slot -->

<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
    <VLayout
      v-if="appStore.active.child"
      class="d-scroll pa-2 overflow-auto"
      min-height="fit-content"
      max-height="100vh"
    >
      <VCard class="ma-auto pa-4" color="primary" :style="{ minWidth: '100%', width: '0px' }">
        <span class="text-h6 font-weight-bold text-center mx-auto"> Ubah Password </span>

        <VLayout class="d-flex flex-column my-2">
          <CustomGridLayout
            class="overflow-auto align-self-left"
            grid-template-columns="minmax(0px, 1fr) auto minmax(0px, 1fr)"
            width="fit-content"
          >
            <template v-for="(item, i) in getDetails" :key="i">
              <span class="font-weight-medium"> {{ item.title }} </span>
              <span> &nbsp;:&nbsp; </span>
              <span> {{ item.value }} </span><br />
            </template>
          </CustomGridLayout>
        </VLayout>
        <VForm>
          <CustomTextField
            v-model="userStore.form.kata_sandi.value"
            label="Kata Sandi"
            :prepend-inner-icon="{
              active: '$lock',
              passive: '$lock-outline',
            }"
            :append-inner-icon="showPassword ? '$eye-off' : '$eye'"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            @click:append-inner="showPassword = !showPassword"
            @update:model-value="(val) => onFieldChange(userFieldForm.kata_sandi, val)"
          />
          <VDivider class="my-1" />
        </VForm>
        <VBtn
          height="56px"
          block
          color="secondary"
          @click="
            () => {
              ;(userStore as any)['updatePassword']()
            }
          "
        >
          Ubah Password
        </VBtn>
      </VCard>
    </VLayout>
  </VFadeTransition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app-store'
import { watch, computed, ref } from 'vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { userFieldForm } from '@/models/action-model'
import { useUserStore } from '@/stores/user-store'
import { findUserById } from '@/stores/data/user'
import { kataSandiValidation } from '@/action/validation/user'
import { User } from '@/models/user-model'

const appStore = useAppStore()
const userStore = useUserStore()

const getItem = computed(() => appStore.user as User)
const showPassword = ref(false)

const getDetails = computed(() => [
  {
    title: 'Email',
    value: getItem.value.email,
  },
  {
    title: 'User Role',
    value: getItem.value.jenis,
  },
  {
    title: 'Kata Sandi',
    value: getItem.value.kata_sandi,
  },
  {
    title: 'Nama Lengkap',
    value: getItem.value.nama_lengkap,
  },
  {
    title: 'Nomor HP',
    value: getItem.value.nomor_hp,
  },
])

function onFieldChange(field: userFieldForm, value: string) {
  switch (field) {
    case 'kata_sandi':
      kataSandiValidation(value)
      break
  }
}

function populateFormFromAppStoreUser() {
  const user = appStore.user as User
  if (!user) return

  userStore.form.kata_sandi.value = user.kata_sandi ?? ''
  userStore.form.email.value = user.email ?? ''
  userStore.form.nama_lengkap.value = user.nama_lengkap ?? ''
  userStore.form.nomor_hp.value = user.nomor_hp ?? ''
}

watch(
  () => [appStore.active.child, userStore.user],
  (values) => {
    if (values[0] && values[1]) {
      userStore.formattedUsers = findUserById(userStore.users, appStore.user.id)
      populateFormFromAppStoreUser()
      appStore.loading = false
    }
  },
  { immediate: true, deep: true },
)
</script>
