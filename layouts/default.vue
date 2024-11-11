<template>
  <div class=" layout-wrapper">
    <main-header :show-to-configurator="onHome"/>
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
  const onHome = computed((): boolean => {
    return useRoute().path === '/';
  });
</script>

<style scoped lang="scss">

</style>
