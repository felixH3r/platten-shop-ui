<template>
  <h1>main page</h1>
  <div>{{ products }}</div>


</template>

<script lang="ts" setup>
  import {usePostStore} from "~/store/posts";
  import {useBackendDataStore} from "~/store/backendData";


  const backendStore = useBackendDataStore();
  await backendStore.getProducts();
  const products = computed(() => {
    return backendStore.products ? backendStore.products : {};
  });

  // const client = useMedusaClient();
  // let pro;
  // try {
  //   const {products} = await backendStore.client.products.list();
  //   pro = products;
  // } catch (e: any) {
  //   console.log(e.stacktrace);
  // }
  computed(() => postStore.nodes);
</script>

<style scoped lang="scss">

</style>
