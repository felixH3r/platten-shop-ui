<template>
  <div class="fixed flex flex-col gap-3 w-full h-56 bg-primary bottom-0 p-5 text-xl">
    <div class="flex justify-between">
      <span>{{ TC.cart.subtotal }}:</span>
      <span>€ {{ prices.subtotal }}</span>
    </div>
    <div class="flex justify-between">
      <span>{{ TC.cart.tax }}</span>
      <span>€ {{ prices.tax }}</span>
    </div>
    <div class="flex justify-between font-medium">
      <span>{{ TC.cart.total }}:</span>
      <span>€ {{ prices.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

  import CTAButton from "~/components/utils/CTAButton.vue";
  import {useMainStore} from "../../store/mainStore";
  import {useBackendDataStore} from "../../store/backendData";
  import {navigateTo} from "#app";

  const backendData = useBackendDataStore();

  const prices = computed((): { subtotal: string, tax: string, total: string } => {
    const prices = {
      subtotal: (0).toFixed(2),
      tax: (0).toFixed(2),
      total: (0).toFixed(2)
    };

    if (!backendData.cart) {
      return prices;
    }

    if (backendData.cart.subtotal) {
      prices.subtotal = (backendData.cart.subtotal / 100).toFixed(2);
    }
    if (backendData.cart.tax_total) {
      prices.tax = (backendData.cart.tax_total / 100).toFixed(2);
    }
    if (backendData.cart.total) {
      prices.total = (backendData.cart.total / 100).toFixed(2);
    }

    return prices;
  });

</script>

<style scoped lang="scss">

</style>
