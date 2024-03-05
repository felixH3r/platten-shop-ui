<template>
  <span>{{ paymentMessage }}</span>
</template>

<script setup lang="ts">
  import {loadStripe} from "@stripe/stripe-js";

  const paymentMessage = ref('');
  const stripe = ref(null as any);

  // Fetches the payment intent status after payment submission
  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.value = await loadStripe('pk_test_51NltREG1wFSpgvXF803jhE8TXCC01jJVIHIUx1WFnlcKXhcMMsprdAzC8l9BY71r5AG0eakWRBECVKnzfz6DPOss00kfY4nBgy');
    if (!stripe) {
      return;
    }
    const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case "succeeded":
        paymentMessage.value = "Payment succeeded!";
        break;
      case "processing":
        paymentMessage.value = "Your payment is processing.";
        break;
      case "requires_payment_method":
        paymentMessage.value = "Your payment was not successful, please try again.";
        break;
      default:
        paymentMessage.value = "Something went wrong.";
        break;
    }
  }
</script>

<style scoped lang="scss">

</style>
