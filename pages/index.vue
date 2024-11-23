<template>
  <div class="overflow-hidden">
    <HeaderSection/>
    <FeaturedSection/>
    <ValuesSliderSection/>
    <CustomerSection/>
    <ContentCardSection/>

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
  import {useMainStore} from "~/store/mainStore";
  import FeaturedSection from "~/components/homepage/featured-section/FeaturedSection.vue";
  import ValuesSliderSection from "~/components/homepage/values-slider-section/ValuesSliderSection.vue";

  const backendStore = useBackendDataStore();

  // beforeCreate(async () => {
  //   await backendStore.fetchProducts();
  // });

  const products = computed(() => {
    return backendStore.products ? backendStore.products : {};
  });

  onMounted(async () => {
    const backendStore = useBackendDataStore();
    await backendStore.loadProductsAndVariants();

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
