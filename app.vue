<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import {useMainStore} from "~/store/mainStore";
  import {throttle} from "~/utils/helper";
  import {useBackendDataStore} from "~/store/backendData";

  const setViewMode = () => {
    const isDesktop = window.innerWidth >= 1024;
    const isMobile = window.innerWidth < 768;
    useMainStore().setIsDesktop(isDesktop);
    useMainStore().setIsMobile(isMobile);
  };

  await useBackendDataStore().fetchProducts();
  await useBackendDataStore().fetchVariants();
  useMainStore().setSelectProduct(useBackendDataStore().products[0]);
  useMainStore().setVariantsSelectedProduct(useBackendDataStore().products[0].variants);

  onBeforeMount(async () => {
    setViewMode();
    window.addEventListener('resize', throttle(setViewMode));
  });
</script>


