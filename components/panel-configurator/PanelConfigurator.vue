<template>
  <div class="flex flex-col justify-between" ref="configurator">
    <PanelContentWrapper/>
    <Sidebar/>
    <!--    <button @click="addToCart">add to cart</button>-->
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

  const configurator = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    if (configurator.value) {
      debugger;
      configurator.value.style.height = window.screen.availHeight + 'px';
    }

  });
  // await backendData.createCart();
  // onMounted(() => {
  //   if (backendData.cart) {
  //     localStorage.setItem('cart_id', backendData.cart.id);
  //   }
  // });
  // const addToCart = async () => {
  //   if (mainStore.selectedProduct && mainStore.selectedProduct.variants[0].id) {
  //     await backendData.addItemToCart(mainStore.selectedProduct.variants[0].id, 1);
  //   }
  //   navigateTo('/cart');
  //   console.log(backendData.cart);
  // };

</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    display: flex;
  }
</style>
