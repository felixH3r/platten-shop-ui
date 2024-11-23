<template>
  <div class=" layout-wrapper">
    <main-header :show-to-configurator="onHome"/>
    <NuxtPage/>
    <main-footer/>
  </div>
</template>

<script lang="ts" setup>
  import MainFooter from "~/components/footer/MainFooter.vue";

  const onHome = computed((): boolean => {
    return useRoute().path === '/';
  });
</script>

<style scoped lang="scss">

</style>
