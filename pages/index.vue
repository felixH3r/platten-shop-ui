<template>
  <h1>main page</h1>
  <div>{{ postStore.products }}</div>
  <div>{{ postStore.products }}</div>
  <div>{{ postStore.products }}</div>
  <div>{{ postStore.products }}</div>
  <div>{{ postStore.products }}</div>
  <div>{{ postStore.products }}</div>


</template>

<script lang="ts" setup>
  import {usePostStore} from "~/store/posts";

  const postStore = usePostStore();
  await postStore.getProducts();
  // computed(() => postStore.nodes);
</script>

<style scoped lang="scss">

</style>
