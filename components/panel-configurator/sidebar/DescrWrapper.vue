<template>
  <h4>{{ TC.pcSidebar.descrHeader }}</h4>
  <span>{{ descr }}</span>
</template>

<script lang="ts" setup>
  import {TC} from "../../../utils/text-content";
  import {useMainStore} from "~/store/mainStore";

  const mainStore = useMainStore();

  const descr = computed(() => {
    return mainStore.selectedProduct?.description;
  });
</script>

<style scoped lang="scss">

</style>
