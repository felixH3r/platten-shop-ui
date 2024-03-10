<template>
  <div class="max-w-screen overflow-hidden">
    <HeaderSection/>
    <CardsSection/>
    <ContentCardSection/>
    <CustomerSection/>
    <PanelOptionSection/>
  </div>
</template>

<script lang="ts" setup>
  import {useBackendDataStore} from "~/store/backendData";
  import HeaderSection from "~/components/homepage/HeaderSection.vue";
  import CardsSection from "~/components/homepage/CardsSection.vue";
  import ContentCardSection from "~/components/homepage/ContentCardSection.vue";
  import CustomerSection from "~/components/homepage/CustomerSection.vue";
  import PanelOptionSection from "~/components/homepage/PanelOptionSection.vue";

  const backendStore = useBackendDataStore();
  await useBackendDataStore().fetchProducts();

  // beforeCreate(async () => {
  //   await backendStore.fetchProducts();
  // });

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
</script>

<style scoped lang="scss">

</style>
