<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import {useMainStore} from "~/store/mainStore";
  import {throttle} from "~/utils/helper";

  const setViewMode = () => {
    const isDesktop = window.innerWidth >= 1024;
    const isMobile = window.innerWidth < 768;
    useMainStore().setIsDesktop(isDesktop);
    useMainStore().setIsMobile(isMobile);
  };

  onBeforeMount(() => {
    setViewMode();
    window.addEventListener('resize', throttle(setViewMode));
  });
</script>


