<template>
  <div class="panel-view-wrapper" ref="panelViewWrapper">
    <div class="human-and-panel-wrapper">
      <HumanSVG class="human-svg"/>
      <div class="panel-img-wrapper">
        <img :src="panelTexture" class="panel-img"/>
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

  await backendData.getProducts();

  const panelTexture = computed(() => {
    return mainStore.selectedProduct?.thumbnail;
  });

  const panelMeasureFactor = computed(() => {
    return mainStore.panelConfigurator.width / mainStore.panelConfigurator.length;
  });

  const longerSide = computed(() => {
    if (mainStore.panelConfigurator.width - mainStore.panelConfigurator.length < 1) {
      return mainStore.panelConfigurator.length / 6 + 'px';
    }
    return mainStore.panelConfigurator.width / 6 + 'px';
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
    height: 65%;
  }

  .human-and-panel-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0 4rem;
  }

  .human-svg {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
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

