<template>
  <div class="flex flex-col justify-between w-28 overflow-hidden" :class="{'selected': isSelected}"
       @click="selectProduct">
    <img :src="mediaItemUrl" class="object-cover relative">
    <span class="flex">{{ props.product.title }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {SymbolKind} from "vscode-languageserver-types";
  import {useMainStore} from "~/store/mainStore";
  import {MedusaProduct} from "~/store/backendData";
  import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";

  const props = defineProps<{ product: PricedProduct, selected: Boolean }>();
  const mainStore = useMainStore();

  const mediaItemUrl = computed((): string => {
    if (!props.product.thumbnail) {
      return '';
    }
    return props.product.thumbnail;
  });

  function selectProduct() {
    mainStore.setSelectProduct(props.product);
  }

  const isSelected = computed(() => {
    return props.product.id === mainStore.selectedProduct?.id;
  });
</script>

<style scoped lang="scss">
  .panel-option-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80%;
    width: 8rem;
    padding: 1rem;
  }

  .panel-option-img-wrapper {
    height: 90%;
    overflow: hidden;
  }

  .panel-option-img {
    display: flex;
    rotate: 90deg;
    height: 60%;
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }

  .panel-option-name {
    display: flex;
    align-items: center;
    text-align: center;
    height: 10%;
  }

  .selected {
    border: gray dashed 1px;
  }

</style>
