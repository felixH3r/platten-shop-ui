<template>
  <div class="panel-view-wrapper h-full" ref="panelViewWrapper">
    <div class="human-and-panel-wrapper">
      <HumanSVG class="human-svg"/>
      <div class="panel-img-wrapper">
        <NuxtImg :src="panelTexture" format="webp" class="panel-img drop-shadow-xl"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HumanSVG from "~/components/icons/HumanSVG.vue";
  import {useMainStore} from "~/store/mainStore";
  import {useBackendDataStore} from "~/store/backendData";

  const mainStore = useMainStore();
  const backendData = useBackendDataStore();
  const panelViewWrapper = ref<HTMLDivElement | null>(null);

  // await backendData.fetchProducts();
  console.log(backendData.products, 'products');

  console.log(backendData.variants, 'variants');
  console.log(backendData.variants[0].options, 'options');

  let panelTypes: string[] = [];
  // let validThickness: number[] = [];

  for (let product of backendData.products) {

    if (product.metadata) {
      // const possibleThickness = product.metadata.thickness.trim().split(/\s*,\s*/);
      // for (let thick of possibleThickness) {
      //   if (!validThickness.includes(thick)) {
      //     validThickness.push(thick);
      //   }
      // }
      const possibleTypes = product.metadata.validMaterials.trim().split(/\s*,\s*/);
      for (let pType of possibleTypes) {
        if (!panelTypes.includes(pType)) {
          panelTypes.push(pType);
        }
      }
    }
  }

  const panelTexture = computed(() => {
    return mainStore.selectedProduct?.thumbnail;
  });

  const panelMeasureFactor = computed(() => {
    return mainStore.panelConfigurator.width / mainStore.panelConfigurator.length;
  });

  const downSizeFactor = computed((): number => {
    return mainStore.getIsDesktop ? 6 : 13;
  });

  const longerSide = computed(() => {
    if (mainStore.panelConfigurator.width - mainStore.panelConfigurator.length < 1) {
      return mainStore.panelConfigurator.length / downSizeFactor.value + 'px';
    }
    return mainStore.panelConfigurator.width / downSizeFactor.value + 'px';
  });

  const panelHeightFactor = computed(() => {
    if (panelMeasureFactor.value > 1) {
      return '100%';
    }
    return panelMeasureFactor.value * 100 + '%';
  });

  const panelWidthFactor = computed(() => {
    if (panelMeasureFactor.value <= 1) {
      return '100%';
    }
    return mainStore.panelConfigurator.length / mainStore.panelConfigurator.width * 100 + '%';
  });
</script>

<style scoped lang="scss">
  .panel-view-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .human-and-panel-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0 4rem;
    width: 90%;
  }

  .human-svg {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 3.5rem;
  }

  .panel-img-wrapper {
    display: flex;
    align-items: flex-end;
    width: v-bind(longerSide);
    height: v-bind(longerSide);
    max-width: 450px;
    max-height: 450px;
  }

  .panel-img {
    display: flex;
    object-fit: cover;
    width: v-bind(panelWidthFactor);
    transition: width 1s, height 1s;
    height: v-bind(panelHeightFactor);
  }
</style>

