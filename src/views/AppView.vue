<template>
  <VFadeTransition style="transition-duration: var(--transition-duration) !important">
    <VApp v-if="appStore.active.parent" style="background-color: transparent">
      <!-- Sidebar -->
      <VNavigationDrawer color="primary" permanent persistent>
        <VListItem v-if="userStore.user" style="height: 64px; overflow: hidden" :title="userStore.user.nama_lengkap"
          :subtitle="userStore.user.jenis" :prepend-avatar="LOGO" />
        <VDivider color="background" />
        <VListItem v-for="(item, i) in items" :key="i" :title="item.title" :to="item.link" :prepend-icon="router.currentRoute.value.path === item.link ? item.icon.active : item.icon.passive
          " link :active="router.currentRoute.value.path === item.link" />
      </VNavigationDrawer>

      <!-- Topbar -->
      <!-- Topbar -->
      <VAppBar app flat color="primary">
        <VAppBarTitle>Dashboard</VAppBarTitle>
        <VSpacer />
        <template v-for="item in topbarItems" :key="item.key">
          <VMenu v-model="item.model.value" offset-y location="bottom end" :close-on-content-click="false">
            <template #activator="{ props }">
              <VBtn icon class="me-2" v-bind="props" style="position: relative">
                <VIcon>{{ item.iconActive }}</VIcon>
                <VBadge v-if="item.type === 'notifikasi' && unreadCountNotif > 0" color="yellow"
                  :content="unreadCountNotif" style="position: absolute; top: 0; right: 0; font-size: 0.7rem" />
              </VBtn>
            </template>
            <VCard :min-width="item.width">
              <VList>
                <!-- Dinamis berdasarkan type -->
                <template v-if="item.type === 'notifikasi'">
                  <template v-if="item.data.value && item.data.value.length > 0">
                    <VListItem v-for="(notifItem, idx) in item.data.value" :key="idx"
                      @click="handleNotifikasiClick(notifItem)" class="cursor-pointer"
                      :class="[notifItem.status_baca ? '' : 'bg-secondary text-black']">
                      <VListItemTitle>{{ notifItem.pesan }}</VListItemTitle>
                      <VListItemSubtitle :class="[
                        'text-caption',
                        notifItem.status_baca ? 'text-gray' : 'text-black',
                      ]">
                        {{ notifItem.convert_tanggal }}
                      </VListItemSubtitle>
                    </VListItem>
                  </template>
                  <template v-else>
                    <VListItem>
                      <VListItemTitle>Tidak ada notifikasi</VListItemTitle>
                    </VListItem>
                  </template>
                </template>

                <template v-else-if="item.type === 'akun'">
                  <template v-for="(akunItem, i) in item.data.value" :key="i">
                    <VListItem @click="akunItem.onClick && akunItem.onClick()">
                      <VListItemTitle>{{ akunItem.title }}</VListItemTitle>
                    </VListItem>
                  </template>
                </template>

                <template v-else>
                  <VListItem>
                    <VListItemTitle>Unknown Type</VListItemTitle>
                  </VListItem>
                </template>
              </VList>
            </VCard>
          </VMenu>
        </template>
        <!-- Tombol Profil -->
      </VAppBar>

      <!-- Main Content -->

      <VMain>
        <VLayout style="overflow: auto !important" height="88vh">
          <RouterView />
        </VLayout>
      </VMain>
    </VApp>
  </VFadeTransition>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app-store'
  import { useUserStore } from '@/stores/user-store'
  import LOGO from '@/assets/logo.svg'
  import { computed } from 'vue'
  import { UserJenis } from '@/models/user-model'
  import router from '@/plugins/router'
  import { getTopbar, ROUTES } from '@/models/app-model'
  import type { TopBar } from '@/models/top-bar-model'
  import { useNotifikasiStore } from '@/stores/notifikasi-store'
  import type { Notifikasi } from '@/models/notifikasi-model'

  const appStore = useAppStore()
  const userStore = useUserStore()
  const notifikasiStore = useNotifikasiStore()

  const topbarItems = computed<TopBar[]>(() => {
    const user = userStore.user
    if (!user) return []

    return getTopbar(user.id, userStore).filter((item) =>
      item.role.includes(user.jenis)
    )
  })

  const unreadCountNotif = computed(() =>
    notifikasiStore.countUnreadNotifikasi(appStore.user.id).count
  );

  function handleNotifikasiClick(notif: Notifikasi) {
    if (!notif.status_baca) {
      notifikasiStore.readNotifikasi(notif.id)
    }

    if (notif.path) {
      router.push(notif.path)
    }
  }
  const items = computed(() => {
    const jenis = userStore.user?.jenis || UserJenis.Tamu

    return ROUTES.filter((route) => route.path !== '/masuk' && route.path !== '/ubah-password')
      .filter((route) => !route.role || route.role.includes(jenis))
      .map((route) => ({
        icon: {
          active: route.iconActive,
          passive: route.iconPassive,
        },
        title: route.name,
        link: route.path,
      }))
  })
</script>
