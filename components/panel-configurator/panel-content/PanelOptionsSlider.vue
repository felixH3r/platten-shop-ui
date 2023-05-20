<template>
  <div class="panel-option-slider">
    <PanelOptionCard v-for="product in products" :product="product"
                     :selected="product.id === selectedProductId"/>
  </div>
</template>

<script lang="ts" setup>
  import {useMainStore} from "~/store/mainStore";
  import {MedusaProduct, useBackendDataStore} from "~/store/backendData";
  import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";

  const mainStore = useMainStore();
  const backendData = useBackendDataStore();

  const products = computed(() => {
    // if(!backendData.products){
    //   return null;
    // }
    // const pro = backendData.products;
    return backendData.products;
  });
  onMounted(() => {
    mainStore.setSelectedProduct(products.value[0]);
  });


  const selectedProductId = mainStore.selectedProduct?.id;


</script>

<style scoped lang="scss">
  .panel-option-slider {
    display: flex;
    height: 35%;
    width: calc(100% - 10rem);
    overflow: scroll;
    gap: 2rem;
  }
</style>
