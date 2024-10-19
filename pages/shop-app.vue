<template>
  <PanelConfigurator/>

</template>

<script lang="ts" setup>
  // document.querySelector('body')!.style.overflow = 'hidden';
  //
  // onBeforeUnmount(() => {
  //   document.querySelector('body')!.style.overflow = 'scroll';
  // });

  import {useBackendDataStore} from "~/store/backendData";
  import {useMainStore} from "~/store/mainStore";

  onMounted(async () => {
    await useBackendDataStore().loadProductsAndVariants();
  });
</script>

<style lang="scss">
</style>
