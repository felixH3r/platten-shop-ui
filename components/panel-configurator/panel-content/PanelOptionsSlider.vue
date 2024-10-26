<template>
  <div class="flex h-48 overflow-scroll md:h-56" ref="scrollContainer" @scroll="checkIfScrolledToEnd">
    <div class="flex gap-2">
      <PanelOptionCard v-for="product in backendData.products" :product="product"/>
    </div>
    <div @click="scrollRight" v-if="!isScrolledToEnd"
         class=" flex items-center justify-end w-32 h-32 bg-gradient-to-r from-transparent via-white via-70% white to-white absolute right-0">
      <div class=" w-10 h-10">
        <RightArrowSVG/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
  import {useBackendDataStore} from "~/store/backendData";
  import RightArrowSVG from "~/components/icons/RightArrowSVG.vue";
  import PanelOptionCard from "~/components/panel-configurator/panel-content/PanelOptionCard.vue";
  import {usePanelConfiguratorStore} from "~/store/panelConfiguratorStore";

  const scrollContainer = ref<HTMLElement | null>(null);
  const isScrolledToEnd = ref(false);

  const panelConfiguratorStore = usePanelConfiguratorStore();
  const backendData = useBackendDataStore();

  const products = computed(() => {
    return backendData.getProducts;
  });

  onMounted(async () => {
    if (!backendData.products || !backendData.products[0]) {
      return;
    }
    panelConfiguratorStore.setSelectPanel(backendData.products[0]);
  });

  const scrollRight = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollBy({
        left: 200, // Change this value to adjust how much it scrolls
        behavior: 'smooth'
      });
    }
  };

  const checkIfScrolledToEnd = () => {
    if (!scrollContainer.value) return;
    const container = scrollContainer.value;
    // Check if the scroll position is at or near the end of the scrollable content
    isScrolledToEnd.value = container.scrollWidth - container.clientWidth <= container.scrollLeft + 1; // Add tolerance
  };


</script>

<style scoped lang="scss">
  .panel-option-slider {
    display: flex;
    height: 35%;
    width: calc(100vw - 10rem);
    overflow: scroll;
    gap: 2rem;
  }
</style>
