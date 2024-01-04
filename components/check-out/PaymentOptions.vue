<template>
  <div class="flex flex-col gap-5">
    <PaymentCard :payment-key="'invoice'" :content="'Per Rechnung'" :checked="enabledPayment.invoice"
                 :select-payment="setActivePayment"
                 class="w-full">
      <CreditCardsSVG/>
    </PaymentCard>
    <div class="flex gap-5 w-full">
      <PaymentCard :payment-key="'creditCard'" :content="'Kreditkarte'" :checked="enabledPayment.creditCard"
                   :select-payment="setActivePayment"
                   class="w-1/2">
        <CreditCardsSVG/>
      </PaymentCard>
      <PaymentCard :payment-key="'paypal'" :content="'Paypal'" :checked="enabledPayment.paypal"
                   :select-payment="setActivePayment"
                   class="w-1/2">
        <PayPalSVG/>
      </PaymentCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SelectComponent from "~/components/utils/SelectComponent.vue";
  import InputComponent from "~/components/utils/InputComponent.vue";
  import PaymentCard from "~/components/utils/PaymentCard.vue";
  import CreditCardsSVG from "~/components/icons/CreditCardsSVG.vue";
  import PayPalSVG from "~/components/icons/PayPalSVG.vue";

  const enabledPayment = reactive({
    invoice: true,
    creditCard: false,
    paypal: false
  });

  const setActivePayment = (paymentKey: 'invoice' | 'creditCard' | 'paypal'): void => {
    Object.keys(enabledPayment).forEach(v => enabledPayment[v as keyof typeof enabledPayment] = false);
    enabledPayment[paymentKey] = true;
  };

</script>

<style scoped lang="scss">

</style>
