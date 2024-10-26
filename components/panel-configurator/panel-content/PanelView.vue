<template>
  <div class="panel-view-wrapper h-full" ref="panelViewWrapper">
    <div class="human-and-panel-wrapper">
      <HumanSVG class="human-svg"/>
      <div class="panel-img-wrapper">
        <NuxtImg :src="panelTexture" format="webp" loading="lazy" class="panel-img drop-shadow-xl"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HumanSVG from "~/components/icons/HumanSVG.vue";
  import {useBackendDataStore} from "~/store/backendData";
  import {usePanelConfiguratorStore} from "~/store/panelConfiguratorStore";
  import {useMainStore} from "~/store/mainStore";

  const mainStore = useMainStore();
  const panelConfiguratorStore = usePanelConfiguratorStore();
  const backendData = useBackendDataStore();
  const panelViewWrapper = ref<HTMLDivElement | null>(null);

  const panelTexture = computed(() => {
    return panelConfiguratorStore.selectedPanel?.thumbnail;
  });

  const panelMeasureFactor = computed(() => {
    return panelConfiguratorStore.panelInputForm.width / panelConfiguratorStore.panelInputForm.length;
  });

  const downSizeFactor = computed((): number => {
    return mainStore.getIsDesktop ? 6 : 13;
  });

  const longerSide = computed(() => {
    if (panelConfiguratorStore.panelInputForm.width - panelConfiguratorStore.panelInputForm.length < 1) {
      return panelConfiguratorStore.panelInputForm.length / downSizeFactor.value + 'px';
    }
    return panelConfiguratorStore.panelInputForm.width / downSizeFactor.value + 'px';
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
    return panelConfiguratorStore.panelInputForm.length / panelConfiguratorStore.panelInputForm.width * 100 + '%';
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

