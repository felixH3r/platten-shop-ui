<template>
  <div class="flex h-32">
    <div class="flex w-full overflow-scroll gap-5">
      <PanelOptionCard v-for="product in backendData.products" :product="product"
                       :selected="product.id === selectedProductId"/>
    </div>
    <div class="w-20 h-48 bg-gradient-to-r from-transparent via-white via-70% white to-white absolute right-0">

    </div>
  </div>

</template>

<script lang="ts" setup>
  import {useMainStore} from "~/store/mainStore";
  import {MedusaProduct, useBackendDataStore} from "~/store/backendData";
  import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";

  const mainStore = useMainStore();
  const backendData = useBackendDataStore();

  const products = computed(() => {
    return backendData.getProducts;
  });
  onMounted(async () => {
    // await backendData.fetchProducts();
    if (!backendData.products || !backendData.products[0]) {
      return;
    }
    mainStore.setSelectProduct(backendData.products[0]);
    mainStore.setVariantsSelectedProduct(backendData.products[0].variants);
    const options = backendData.products[0].options;
    for (let option of options) {
      if (option.title === 'Material') {
        mainStore.setMaterials(option.values);
      }
      if (option.title === 'Dicke') {
        mainStore.setThicknesses(option.values);
      }
    }
  });
  const selectedProductId = mainStore.selectedProduct?.id;


</script>

<style scoped lang="scss">
  .panel-option-slider {
    display: flex;
    height: 35%;
    width: calc(100vw - 10rem);
    overflow: scroll;
    gap: 2rem;
  }
</style>
