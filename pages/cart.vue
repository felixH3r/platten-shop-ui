<template>
  <!--  pb-56 because the price overflow has h-56 -->
  <div class="pt-16 px-5 pb-56 overflow-scroll">
    <h1 class="text-3xl pb-10">Warenkorb</h1>
    <CartOverview class="h-32"/>
  </div>
  <PriceOverview/>

  <!--  <CheckoutInput/>-->
</template>

<script setup lang="ts">
  import CartOverview from "~/components/cart/CartOverview.vue";
  import CheckoutInput from "~/components/cart/CheckoutInput.vue";
  import PriceOverview from "~/components/cart/PriceOverview.vue";

</script>

<style scoped lang="scss">

</style>
