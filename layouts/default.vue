<template>
  <div class="layout-wrapper">
    <main-header :show-to-configurator="onHome" v-if="showHeader"/>
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
    return route.path !== '/shop-app' && route.path !== '/cart' && route.path !== '/shipment' && route.path !== '/payment' && route.path !== '/';
  });

  const showHeader = computed((): boolean => {
    const route = useRoute();
    return route.path !== '/';
  });
</script>

<style scoped lang="scss">

</style>
