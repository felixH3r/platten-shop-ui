<template>
  <div class="flex h-48 overflow-scroll md:h-56" ref="scrollContainer" @scroll="checkIfScrolledToEnd">
    <div class="flex gap-2">
      <PanelOptionCard v-for="product in backendData.products" :product="product"
                       :selected="product.id === selectedProductId"/>
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
  import {useMainStore} from "~/store/mainStore";
  import {useBackendDataStore} from "~/store/backendData";
  import RightArrowSVG from "~/components/icons/RightArrowSVG.vue";

  const scrollContainer = ref<HTMLElement | null>(null);
  const isScrolledToEnd = ref(false);

  const mainStore = useMainStore();
  const backendData = useBackendDataStore();

  const products = computed(() => {
    return backendData.getProducts;
  });

  const scrollRight = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollBy({
        left: 200, // Change this value to adjust how much it scrolls
        behavior: 'smooth'
      });
      // handleScroll(); // Call to update arrow visibility after the scroll
    }
  };

  const checkIfScrolledToEnd = () => {
    if (!scrollContainer.value) return;
    const container = scrollContainer.value;
    // Check if the scroll position is at or near the end of the scrollable content
    isScrolledToEnd.value = container.scrollWidth - container.clientWidth <= container.scrollLeft + 1; // Add tolerance
  };

  onMounted(async () => {
    // await backendData.fetchProducts();
    if (!backendData.products || !backendData.products[0]) {
      return;
    }
    mainStore.setSelectProduct(backendData.products[0]);
    mainStore.setVariantsSelectedProduct(backendData.products[0].variants);
    const options = backendData.products[0].options;
    for (let option of options) {
      if (option.title === 'Material') {
        mainStore.setMaterials(option.values);
      }
      if (option.title === 'Dicke') {
        mainStore.setThicknesses(option.values);
      }
    }
  });
  const selectedProductId = mainStore.selectedProduct?.id;


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
