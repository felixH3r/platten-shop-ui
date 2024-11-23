<template>
  <div class=" layout-wrapper">
    <main-header :show-to-configurator="onHome"/>
    <NuxtPage/>
    <main-footer v-if="showFooter"/>
  </div>
</template>

<script lang="ts" setup>
  import MainFooter from "~/components/footer/MainFooter.vue";

  const onHome = computed((): boolean => {
    return useRoute().path === '/';
  });

  const showFooter = computed((): boolean => {
    const route = useRoute();
    return route.path !== '/shop-app' && route.path !== '/cart' && route.path !== '/shipment' && route.path !== '/payment';
  });
</script>

<style scoped lang="scss">

</style>
