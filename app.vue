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
    useMainStore().setIsDesktop(isDesktop);
  };

  onBeforeMount(() => {
    debugger;
    setViewMode();
    window.addEventListener('resize', throttle(setViewMode));
  });
</script>


