<template>
  <PanelConfigurator/>

</template>

<script lang="ts" setup>
  import PanelConfigurator from "~/components/panel-configurator/PanelConfigurator";
  import {useBackendDataStore} from "~/store/backendData";

  onMounted(async () => {
    await useBackendDataStore().loadProductsAndVariants();
  });
</script>

<style lang="scss">
</style>
