<template>
  <!--  pb-56 because the price overflow has h-56 -->
  <div class="pt-28 px-5 pb-56 overflow-scroll">
    <h1 class="text-3xl pb-10">Warenkorb</h1>
    <CartOverview class="h-32"/>
  </div>
  <PriceOverview/>
  <CTAButton class="fixed bottom-5 right-5" :content="'Weiter'" @click="goToCheckOut"/>

  <!--  <CheckoutInput/>-->
</template>

<script setup lang="ts">
  import CartOverview from "~/components/cart/CartOverview.vue";
  import CheckoutInput from "~/components/check-out/ShipmentData.vue";
  import PriceOverview from "~/components/cart/PriceOverview.vue";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import {navigateTo} from "#app";

  const goToCheckOut = (): void => {
    navigateTo('/shipment');
  };

</script>

<style scoped lang="scss">

</style>
