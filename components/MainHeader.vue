<template>
  <div class="flex gap-5 font-sans">
    <NuxtLink to="shop-app" v-if="showToConfigurator">{{ routingTo }}</NuxtLink>
    <NuxtLink to="/" v-else>Home</NuxtLink>
    <div>Warenkorb</div>
  </div>
</template>

<script lang="ts" setup>
  import {TC} from "~/utils/text-content";

  const props = defineProps({
    showToConfigurator: Boolean,
  });
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
