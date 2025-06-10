/* eslint-disable @typescript-eslint/no-explicit-any */

import { createRouter, createWebHistory } from "vue-router";
import AppView from "@/views/AppView.vue";
import { useAppStore } from "@/stores/app-store";
import { useUserStore } from "@/stores/user-store";
import { UserJenis } from "@/models/user-model";
import { delay } from "@/utils/util";
import { ROUTES, TRANSITION_DURATION } from "@/models/app-model";
import { useMobilStore } from "@/stores/mobil-store";
import { usePendapatanStore } from "@/stores/pendapatan-store";
import { useSopirStore } from "@/stores/sopir-store";
import { initializeUsers } from "@/stores/data/user";
import { initializeSopirs } from "@/stores/data/sopir";
import { initializeMobils } from "@/stores/data/mobil";
import { initializeSpareParts } from "@/stores/data/spare-part";
import { useSparePartStore } from "@/stores/spare-part-store";
import { initializePendapatans } from "@/stores/data/pendapatan";
import { usePengeluaranStore } from "@/stores/pengeluaran-store";
import { initializePengeluarans } from "@/stores/data/pengeluaran";
import { usePKSStore } from "@/stores/pks-store";
import { initializePKSes } from "@/stores/data/pks";
import { useNotifikasiStore } from "@/stores/notifikasi-store";
import { initializeNotifikasis } from "@/stores/data/notifikasi";

const routeMasuk = ROUTES.find((r) => r.path === "/masuk");

const routes = [
  {
    path: "/beranda",
    name: "App",
    component: AppView,
    meta: {
      jenis: [UserJenis.Pemilik, UserJenis.Admin, UserJenis.Bengkel],
    },
    children: ROUTES.filter((r) => r.path !== "/masuk").map((route) => ({
      path: route.path,
      name: route.name,
      component: route.component,
      meta: {
        jenis: route.role,
      },
    })),
  },
  ...(routeMasuk
    ? [
        {
          path: routeMasuk.path,
          name: routeMasuk.name,
          component: routeMasuk.component,
          meta: {
            jenis: routeMasuk.role || [],
          },
        },
      ]
    : []),
  {
    path: "/:catchAll(.*)",
    redirect: "/beranda",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  const userStore = useUserStore();
  const mobilStore = useMobilStore();
  const pendapatanStore = usePendapatanStore();
  const pengeluaranStore = usePengeluaranStore();
  const sopirStore = useSopirStore();
  const sparePartStore = useSparePartStore();
  const pksStore = usePKSStore();
  const notifikasiStore = useNotifikasiStore();

  if (
    from.path !== "/" &&
    (!appStore.active.parent || !appStore.active.child)
  ) {
    return next(false);
  }

  if ((!userStore.user || !userStore.user.id) && to.name !== "Masuk") {
    return next({ name: "Masuk" });
  }

  if (userStore.user && userStore.user.id && to.name === "Masuk") {
    return next({ name: "Beranda" });
  }

  if (
    userStore.user &&
    userStore.user.id &&
    !(to.meta.jenis as UserJenis[]).includes(userStore.user.jenis)
  ) {
    return next({ name: "Beranda" });
  }

  appStore.loading = true;

  const appRoutes = router
    .getRoutes()
    .filter((route) => route.name === "App")
    .flatMap((route) => route.children);

  if (
    (to.name === "Beranda" && from.name === "Masuk") ||
    (to.name === "Masuk" &&
      appRoutes.some((route) => route.name === from.name)) ||
    from.path === "/"
  ) {
    appStore.active.parent = false;

    delay(TRANSITION_DURATION).then(() => {
      appStore.active.parent = true;
    });
  }

  if (
    (appRoutes.some((route) => route.name === to.name) &&
      appRoutes.some((route) => route.name === from.name)) ||
    from.path === "/"
  ) {
    appStore.active.child = false;

    delay(TRANSITION_DURATION).then(() => {
      appStore.active.child = true;
    });
  }

  appStore.synchronize();

  if (userStore.users.length === 0) {
    userStore.users = initializeUsers();
  }

  if (mobilStore.mobils.length === 0) {
    mobilStore.mobils = initializeMobils();
  }

  if (sparePartStore.spareParts.length === 0) {
    sparePartStore.spareParts = initializeSpareParts();
  }

  if (sopirStore.sopirs.length === 0) {
    sopirStore.sopirs = initializeSopirs();
  }

  if (pksStore.pks.length === 0) {
    pksStore.pks = initializePKSes();
  }

  if (pendapatanStore.pendapatans.length === 0) {
    pendapatanStore.pendapatans = initializePendapatans();
  }

  if (pengeluaranStore.pengeluarans.length === 0) {
    pengeluaranStore.pengeluarans = initializePengeluarans();
  }

  if (notifikasiStore.notifikasis.length === 0) {
    notifikasiStore.notifikasis = initializeNotifikasis();
  }

  if (import.meta.env.VITE_ENVIRONMENT === "development") {
    const sopirStore = useSopirStore();
    if (sopirStore.sopirs.length === 0) {
      sopirStore.sopirs = initializeSopirs();
    }
    const mobilStore = useMobilStore();
    if (mobilStore.mobils.length === 0) {
      mobilStore.mobils = initializeMobils();
    }
    const sparePartStore = useSparePartStore();
    if (sparePartStore.spareParts.length === 0) {
      sparePartStore.spareParts = initializeSpareParts();
    }
    const pendapatanStore = usePendapatanStore();
    if (pendapatanStore.pendapatans.length === 0) {
      pendapatanStore.pendapatans = initializePendapatans();
    }
    const pengeluaranStore = usePengeluaranStore();
    if (pengeluaranStore.pengeluarans.length === 0) {
      pengeluaranStore.pengeluarans = initializePengeluarans();
    }
  }

  next();
});

export default router;
