<template>
  <VLayout class="position-relative mb-8">
    <VBtn position="absolute" size="32px" variant="tonal" :elevation="0" @click="
      () => {
        userStore.resetForm()
        appStore.resetDialog()
      }
    ">
      <VIcon size="20px" icon="$close" color="surface" />
    </VBtn>

    <span class="text-h6 font-weight-bold text-center mx-auto"> {{ getTitle }} Admin </span>
  </VLayout>

  <!-- ~1~DELETE -->
  <template v-if="action === 'delete'">
    <VLayout>
      <VCard class="pa-1 mx-auto" color="surface" :elevation="4">
        <VIcon icon="$alert" size="128px" color="primary" />
      </VCard>
    </VLayout>

    <VLayout class="d-flex flex-column mt-8">
      <span class="font-weight-bold mx-auto"> Detail </span>

      <CustomGridLayout class="overflow-auto align-self-center"
        grid-template-columns="minmax(0px, 1fr) auto minmax(0px, 1fr)" width="fit-content">
        <template v-for="(item, i) in getDetails" :key="i">
          <span class="font-weight-medium"> {{ item.title }} </span>
          <span> &nbsp;:&nbsp; </span>
          <span> {{ item.value }} </span>
        </template>
      </CustomGridLayout>
    </VLayout>
  </template>

  <!-- ~1~CREATE & UPDATE -->
  <template v-else>
    <VForm>
      <CustomTextField v-model="userStore.form.nama_lengkap.value" label="Nama Lengkap"
        placeholder="Maksimal 50 Karakter" :prepend-inner-icon="{
          active: '$account',
          passive: '$account-outline',
        }" autocomplete="name" @update:model-value="
          (val: string) => onFieldChange(userFieldForm.nama_lengkap, val)
        " />
      <VDivider class="my-1" />

      <CustomTextField v-model="userStore.form.nomor_hp.value" label="Nomor HP" placeholder="8XX-XXXX-XXXX"
        :prepend-inner-icon="{
          active: '$phone',
          passive: '$phone-outline',
        }" prefix="+62" @update:model-value="
          (val: string) => onFieldChange(userFieldForm.nomor_hp, val)
        " />
      <VDivider class="my-1" />

      <CustomTextField v-model="userStore.form.email.value" label="Email" placeholder="example@example.com"
        :prepend-inner-icon="{
          active: '$email',
          passive: '$email-outline',
        }" autocomplete="email" @update:model-value="
          (val: string) => onFieldChange(userFieldForm.email, val)
        " />
      <VDivider class="my-1" />
    </VForm>
  </template>

  <div class="my-4"></div>

  <VBtn height="56px" block color="secondary" @click="
    () => {
      (userStore as any)[action](UserJenis.Admin, props);
    }
  ">
    {{ getTitle }}
  </VBtn>
</template>

<script setup lang="ts">
  import CustomGridLayout from '@/components/CustomGridLayout.vue'
  import CustomTextField from '@/components/CustomTextField.vue'
  import { DialogAction } from '@/models/app-model'
  import { FormattedUser, UserJenis } from '@/models/user-model'
  import { useAppStore } from '@/stores/app-store'
  import { useUserStore } from '@/stores/user-store'
  import {
    emailValidation,
    kataSandiValidation,
    namaLengkapValidation,
    nomorHpValidation,
  } from '@/action/validation/user'
  import { computed, onBeforeMount, watch } from 'vue'
  import { userFieldForm } from '@/models/action-model'

  const props = defineProps({
    action: {
      type: String as () => DialogAction,
      required: true,
    },
  })

  const appStore = useAppStore()
  const userStore = useUserStore()
  const getItem = computed(() => appStore.dialog.item as FormattedUser)

  const getTitle = computed(() =>
    props.action === 'create' ? 'Tambah' : props.action === 'update' ? 'Ubah' : 'Hapus',
  )

  const getDetails = computed(() => [
    {
      title: 'Jenis',
      value: getItem.value.jenis,
    },
    {
      title: 'Nama Lengkap',
      value: getItem.value.nama_lengkap,
    },
    {
      title: 'Nomor HP',
      value: getItem.value.nomor_hp,
    },
    {
      title: 'Email',
      value: getItem.value.email,
    },
    {
      title: 'Kata Sandi',
      value: getItem.value.kata_sandi,
    },
  ])

  function onFieldChange(field: userFieldForm, value: string) {
    userStore.form[field].value = value

    switch (field) {
      case 'nama_lengkap':
        namaLengkapValidation(value)
        break
      case 'nomor_hp':
        nomorHpValidation(value)
        break
      case 'email':
        emailValidation(value)
        break
      case 'kata_sandi':
        kataSandiValidation(value)
        break
    }
  }

  watch(
    () => props.action,
    (newVal) => {
      if (newVal === 'update') {
        userStore.form.nama_lengkap.value = getItem.value.nama_lengkap
        userStore.form.nomor_hp.value = getItem.value.nomor_hp
        userStore.form.email.value = getItem.value.email
        userStore.form.kata_sandi.value = getItem.value.kata_sandi

        namaLengkapValidation(getItem.value.nama_lengkap)
        nomorHpValidation(getItem.value.nomor_hp)
        emailValidation(getItem.value.email)
        kataSandiValidation(getItem.value.kata_sandi)
      }

      if (newVal === 'create') {
        userStore.resetForm()
      }
    },
    { immediate: true },
  )

  onBeforeMount(() => {
    if (props.action === 'update') {
      userStore.form.nama_lengkap.value = getItem.value.nama_lengkap
      userStore.form.nomor_hp.value = getItem.value.nomor_hp
      userStore.form.email.value = getItem.value.email
      userStore.form.kata_sandi.value = getItem.value.kata_sandi

      namaLengkapValidation(getItem.value.nama_lengkap)
      nomorHpValidation(getItem.value.nomor_hp)
      emailValidation(getItem.value.email)
      kataSandiValidation(getItem.value.kata_sandi)
    }
  })
</script>
