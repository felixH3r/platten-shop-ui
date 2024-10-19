<template>
  <div class="flex flex-col items-center overflow-ellipsis h-28 w-24 p-1 gap-1 md:h-36 md:w-28 cursor-pointer"
       :class="{'selected': isSelected}"
       @click="selectProduct">
    <NuxtImg :src="mediaItemUrl" format="webp"
             class="object-cover rounded-full w-16 h-16 drop-shadow-lg md:w-20 md:h-20"/>
    <span class="flex text-center text-sm">{{ props.product.title }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {SymbolKind} from "vscode-languageserver-types";
  import {useMainStore} from "~/store/mainStore";
  import {MedusaProduct} from "~/store/backendData";
  import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";
  import {main} from "@popperjs/core";

  const props = defineProps<{ product: PricedProduct, selected: Boolean }>();
  const mainStore = useMainStore();

  const mediaItemUrl = computed((): string => {
    if (!props.product.thumbnail) {
      return '';
    }
    return props.product.thumbnail;
  });

  const selectProduct = () => {
    mainStore.setSelectProduct(props.product);
    mainStore.setVariantsSelectedProduct(props.product.variants);
    const options = props.product.options;
    if (!options) {
      return;
    }
    for (let option of options) {
      if (option.title === 'Material') {
        mainStore.setMaterials(option.values);
      }
      if (option.title === 'Dicke') {
        mainStore.setThicknesses(option.values);
      }
    }
    console.log(mainStore.variants, 'variants');
    console.log(props.product.options, 'options');
  };

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
