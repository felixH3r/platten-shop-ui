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
  const props = defineProps({
    showToConfigurator: Boolean,
  })
  const routingTo = computed((): string => props.showToConfigurator ? 'Konfigurator' : 'Home');
</script>

<style scoped lang="scss">
  .main-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    width: 90%;
    height: 3rem;
    background-color: #38470B;
  }

  .header-content {
    gap: 2rem;
  }
</style>
