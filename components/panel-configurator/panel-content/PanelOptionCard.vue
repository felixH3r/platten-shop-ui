<template>
  <div class="flex flex-col items-center overflow-ellipsis h-28 w-24 p-1 gap-1 md:h-36 md:w-28 cursor-pointer"
       :class="{'selected': isSelected}"
       @click="selectPanel">
    <NuxtImg :src="mediaItemUrl" format="webp" loading="lazy"
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
  import {usePanelConfiguratorStore} from "~/store/panelConfiguratorStore";

  const props = defineProps<{ product: PricedProduct }>();
  const panelConfiguratorStore = usePanelConfiguratorStore();

  const mediaItemUrl = computed((): string => {
    if (!props.product.thumbnail) {
      return '';
    }
    return props.product.thumbnail;
  });

  const selectPanel = () => {
    panelConfiguratorStore.setSelectPanel(props.product);
  };

  const isSelected = computed(() => {
    return props.product.id === panelConfiguratorStore.selectedPanel?.id;
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
