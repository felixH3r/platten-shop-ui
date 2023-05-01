<template>
  <div class="panel-option-slider">
    <PanelOptionCard v-for="product in products" :product="product"
                     :selected="product.productId === selectedProductId"/>
  </div>
</template>

<script lang="ts" setup>
  import {Product, usePostStore} from "~/store/posts";
  import {useMainStore} from "~/store/mainStore";

  const postStore = usePostStore();
  const mainStore = useMainStore();

  await postStore.getProducts();
  const products = computed(() => {
    return postStore.products;
  });
  mainStore.setSelectedProduct(products.value[0]);

  const selectedProductId = mainStore.selectedProduct?.productId;


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
