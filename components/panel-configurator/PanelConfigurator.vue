<template>
  <div class="panel-configurator-wrapper">
    <Sidebar/>
    <PanelContentWrapper/>
    <button @click="addToCart">add to cart</button>
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from "~/components/panel-configurator/sidebar/Sidebar.vue";
  import {useBackendDataStore} from "~/store/backendData";
  import {useMainStore} from "~/store/mainStore";
  import {useRoute} from "vue-router";
  import {navigateTo} from "#app";

  const backendData = useBackendDataStore();
  const mainStore = useMainStore();
  await backendData.createCart();
  onMounted(() => {
    if (backendData.cart) {
      localStorage.setItem('cart_id', backendData.cart.id);
    }
  });
  const addToCart = async () => {
    if (mainStore.selectedProduct && mainStore.selectedProduct.variants[0].id) {
      await backendData.addItemToCart(mainStore.selectedProduct.variants[0].id, 1);
    }
    navigateTo('/cart');
    console.log(backendData.cart);
  };

</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    display: flex;
  }
</style>
