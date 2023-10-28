<template>
  <div>
    <HeaderSection/>
    <CardsSection/>
    <ContentCardSection/>
  </div>


</template>

<script lang="ts" setup>
  import {useBackendDataStore} from "~/store/backendData";
  import HeaderSection from "~/components/homepage/HeaderSection.vue";
  import CardsSection from "~/components/homepage/CardsSection.vue";
  import ContentCardSection from "~/components/homepage/ContentCardSection.vue";


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
