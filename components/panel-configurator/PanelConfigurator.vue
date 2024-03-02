<template>
  <div class="panel-configurator-wrapper flex flex-col-reverse justify-between md:flex-row" ref="configurator">
    <Sidebar class="md:w-config-sidebar"/>
    <PanelContentWrapper class="md:w-full"/>
    <CTAButton class="absolute right-5 bottom-5" :content="TC.pc.addToCart" :on-click="addToCart"
               :is-loading="isLoading"/>
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from "~/components/panel-configurator/sidebar/Sidebar.vue";
  import {useBackendDataStore} from "~/store/backendData";
  import {useMainStore} from "~/store/mainStore";
  import {useRoute} from "vue-router";
  import {navigateTo} from "#app";
  import CTAButton from "~/components/utils/CTAButton.vue";

  const backendData = useBackendDataStore();
  const mainStore = useMainStore();

  const configurator = ref<HTMLDivElement | null>(null);
  const isLoading = ref(false);

  onMounted(() => {
    document.querySelector("body")!.style.overflow = "hidden";
    if (!backendData.cart) {
      backendData.createCart();
    }
  });

  onUnmounted(() => {
    document.querySelector("body")!.style.overflow = "scroll";
  });

  const addToCart = async () => {
    if (mainStore.selectedProduct && mainStore.getSelectedVariant?.id) {
      isLoading.value = true;
      await backendData.addItemToCart(mainStore.getSelectedVariant?.id, 1);
      isLoading.value = false;
    }
    navigateTo('/cart');
    console.log(backendData.cart);
  };

</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    height: 100dvh
  }
</style>
