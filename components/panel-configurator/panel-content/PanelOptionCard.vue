<template>
  <div class="panel-option-card" :class="{'selected': isSelected}" @click="selectProduct">
    <div class="panel-option-img-wrapper">
      <img :src="mediaItemUrl" class="panel-option-img">
    </div>
    <span class="panel-option-name">{{ props.product.name }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {Product} from '@/store/posts';
  import {SymbolKind} from "vscode-languageserver-types";
  import {useMainStore} from "~/store/mainStore";

  const props = defineProps<{ product: Product, selected: Boolean }>();
  const mainStore = useMainStore();

  const mediaItemUrl = computed((): string => {
    if (!props.product.image || !props.product.image.mediaItemUrl) {
      return '';
    }
    return props.product.image.mediaItemUrl;
  });

  function selectProduct() {
    mainStore.setSelectedProduct(toRaw(props.product));
  }

  const isSelected = computed(() => {
    return props.product.productId === mainStore.selectedProduct?.productId;
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
