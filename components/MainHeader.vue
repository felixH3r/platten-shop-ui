<template>
  <div class="main-header">
    <div class="header-content flex-center">
      <NuxtLink to="shop-app" v-if="showToConfigurator">{{ routingTo }}</NuxtLink>
      <NuxtLink to="/" v-else>Home</NuxtLink>
      <div>Warenkorb</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {TC} from "~/components/utils/text-content";

  const props = defineProps({
    showToConfigurator: Boolean,
  })
  const routingTo = computed((): string => props.showToConfigurator ? TC.mainHeader.configurator : TC.mainHeader.home);
</script>

<style scoped lang="scss">
  .main-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 3rem;
    padding: 0 3rem;
  }

  .header-content {
    gap: 2rem;
  }
</style>
