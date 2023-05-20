<template>
  <div class="panel-option-card" :class="{'selected': isSelected}" @click="selectProduct">
    <div class="panel-option-img-wrapper">
      <img :src="mediaItemUrl" class="panel-option-img">
    </div>
    <span class="panel-option-name">{{ props.product.title }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {Product} from '@/store/posts';
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
    mainStore.setSelectedProduct(props.product);
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
