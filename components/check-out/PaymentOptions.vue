<template>
  <div class="flex flex-col gap-5">
    <PaymentCard :payment-key="PAYMENT_OPTIONS.INVOICE" :content="'Per Rechnung'"
                 :checked="activePayment === PAYMENT_OPTIONS.INVOICE"
                 :select-payment="setActivePayment"
                 class="w-full">
      <CreditCardsSVG/>
    </PaymentCard>
    <div class="flex gap-5 w-full">
      <PaymentCard :payment-key="PAYMENT_OPTIONS.CREDIT_CARD" :content="'Kreditkarte'"
                   :checked="activePayment === PAYMENT_OPTIONS.CREDIT_CARD"
                   :select-payment="setActivePayment"
                   class="w-1/2">
        <CreditCardsSVG/>
      </PaymentCard>
      <PaymentCard :payment-key="PAYMENT_OPTIONS.PAYPAL" :content="'Paypal'"
                   :checked="activePayment === PAYMENT_OPTIONS.PAYPAL"
                   :select-payment="setActivePayment"
                   class="w-1/2">
        <PayPalSVG/>
      </PaymentCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PaymentCard from "~/components/utils/PaymentCard.vue";
  import CreditCardsSVG from "~/components/icons/CreditCardsSVG.vue";
  import PayPalSVG from "~/components/icons/PayPalSVG.vue";
  import {PAYMENT_OPTIONS} from "~/utils/types";
  import {useMainStore} from "~/store/mainStore";

  const activePayment = ref(PAYMENT_OPTIONS.INVOICE);

  onMounted(() => {
    useMainStore().setPaymentOption(PAYMENT_OPTIONS.INVOICE);
  });

  const setActivePayment = (paymentKey: PAYMENT_OPTIONS): void => {
    activePayment.value = paymentKey;
    useMainStore().setPaymentOption(paymentKey);
  };


</script>

<style scoped lang="scss">

</style>
