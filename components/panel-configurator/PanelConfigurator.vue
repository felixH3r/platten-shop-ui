<template>
  <div class="panel-configurator-wrapper flex flex-col-reverse justify-between md:flex-row" ref="configurator">
    <Sidebar class="md:w-1/3" ref="sidebar"/>
    <PanelContentWrapper class="md:w-2/3"/>
    <CTAButton class="absolute right-5 bottom-5" :content="TC.pc.addToCart" :on-click="addToCart"
               :is-loading="isLoading"/>
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from "~/components/panel-configurator/sidebar/Sidebar.vue";
  import {useBackendDataStore} from "~/store/backendData";
  import {useRoute} from "vue-router";
  import {navigateTo} from "#app";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import PanelContentWrapper from "~/components/panel-configurator/panel-content/PanelContentWrapper.vue";
  import {usePanelConfiguratorStore} from "~/store/panelConfiguratorStore";

  const backendData = useBackendDataStore();
  // const mainStore = useMainStore();
  const panelConfiguratorStore = usePanelConfiguratorStore();

  const configurator = ref<HTMLDivElement | null>(null);
  const isLoading = ref(false);
  const sidebar = ref({validateInputs: () => false});

  onMounted(async () => {
    document.querySelector("body")!.style.overflow = "hidden";
    // await backendData.createCart();
  });

  onUnmounted(() => {
    document.querySelector("body")!.style.overflow = "scroll";
  });

  const addToCart = async () => {
    if (!sidebar.value.validateInputs()) {
      return;
    }
    if (panelConfiguratorStore.selectedPanel && panelConfiguratorStore.selectedVariant?.id) {
      isLoading.value = true;
      await backendData.addPanelToCart(panelConfiguratorStore.selectedVariant?.id, 1, panelConfiguratorStore.panelInputForm.width, panelConfiguratorStore.panelInputForm.length);
      panelConfiguratorStore.$resetPanelInputForm();
      isLoading.value = false;
    }
    navigateTo('/cart');
  };

</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    height: 100dvh
  }
</style>
