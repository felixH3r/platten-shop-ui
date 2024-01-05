<template>
  <div class="pt-16 px-5 min-h-screen bg-primary">
    <h1 class="text-3xl pb-10">Lieferadresse:</h1>
    <shipment-data/>
    <CTAButton :content="'Zur Bezahlung'" :on-click="goToPayment" class="fixed bottom-5 right-5"/>
  </div>
</template>

<script setup lang="ts">
  import ShipmentData from "~/components/check-out/ShipmentData.vue";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import {navigateTo} from "#app";

  const goToPayment = (): void => {
    navigateTo('/payment');
  };
</script>

<style scoped lang="scss">

</style>
