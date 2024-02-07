<template>
  <div class="pt-16 pb-60 px-5 min-h-screen bg-primary">
    <h1 class="text-3xl pb-5">Bezahlung:</h1>
    <PaymentOptions/>
    <CreditCardInput/>
    <h4 class="pt-8 pb-5">Rechnungsadresse:</h4>
    <InvoiceData class="w-full"/>
  </div>
  <PriceOverview class="bg-white shadow-lg"/>
  <CTAButton :content="'Bezahlen'" class="fixed bottom-5 right-5"/>
</template>

<script setup lang="ts">

  import InvoiceData from "~/components/check-out/InvoiceData.vue";
  import PaymentOptions from "~/components/check-out/PaymentOptions.vue";
  import PriceOverview from "~/components/cart/PriceOverview.vue";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import CreditCardsSVG from "~/components/icons/CreditCardsSVG.vue";
  import CreditCardInput from "~/components/check-out/CreditCardInput.vue";

</script>

<style scoped lang="scss">

</style>
