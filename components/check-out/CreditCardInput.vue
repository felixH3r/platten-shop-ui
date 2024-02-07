<template>
  <div id="payment-element"></div>
</template>

<script setup lang="ts">


  import Stripe, {loadStripe} from "@stripe/stripe-js";
  import {useMedusaClient} from "#imports";
  import {useBackendDataStore} from "~/store/backendData";

  const card_no = ref('');

  onMounted(async () => {
    await setUpStripe();
  });

  const setUpStripe = async () => {
    // if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    //   return;
    // }
    const stripe = await loadStripe('pk_test_51NltREG1wFSpgvXF803jhE8TXCC01jJVIHIUx1WFnlcKXhcMMsprdAzC8l9BY71r5AG0eakWRBECVKnzfz6DPOss00kfY4nBgy');
    if (!stripe) {
      return;
    }
    const client = useMedusaClient();
    const backendData = useBackendDataStore();

    if (!backendData.cart) {
      console.warn('no cart therefore no payment possible');
      return;
    }
    const newCart = await client.carts.createPaymentSessions(backendData.cart.id);
    const isStripeAvailable = newCart.cart.payment_sessions?.some(
        (session) => (
            session.provider_id === "stripe"
        )
    );
    if (!isStripeAvailable) {
      return;
    }
    const secondCart = await client.carts.setPaymentSession(newCart.cart.id, {
      provider_id: "stripe"
    });
    const clientSecret = secondCart.cart.payment_session?.data.client_secret as string;
    const elements = stripe.elements({clientSecret});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
  };

</script>

<style scoped lang="scss">

</style>
