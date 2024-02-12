<template>
  <div id="payment-element"></div>
  <button @click="processPayment">test bezahlung</button>
</template>

<script setup lang="ts">


  import Stripe, {loadStripe, StripePaymentElement} from "@stripe/stripe-js";
  import {useMedusaClient} from "#imports";
  import {useBackendDataStore} from "~/store/backendData";


  const stripe = ref(null as any);
  const paymentElement = ref(null as Nullable<StripePaymentElement>);
  const clientSecret = ref('');


  onMounted(async () => {
    await setUpStripe();
  });

  const setUpStripe = async () => {
    // if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    //   return;
    // }
    stripe.value = await loadStripe('pk_test_51NltREG1wFSpgvXF803jhE8TXCC01jJVIHIUx1WFnlcKXhcMMsprdAzC8l9BY71r5AG0eakWRBECVKnzfz6DPOss00kfY4nBgy');
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
    clientSecret.value = secondCart.cart.payment_session?.data.client_secret as string;
    const elements = stripe.value.elements({clientSecret: clientSecret.value});
    paymentElement.value = elements.create('card');
    if (!paymentElement.value) {
      return;
    }
    paymentElement.value.mount('#payment-element');

    // just add a sample customer REFACTOR NEEDED!!
    await client.carts.update(backendData.cart.id, {email: 'f.hermanutz@icloud.com'});
  };

  const processPayment = async () => {
    const {error, paymentIntent} = await stripe.value.confirmCardPayment(clientSecret.value, {
      payment_method: {
        card: paymentElement.value,
        billing_details: {
          name: 'felix hermanutz',
          email: 'f.hermanutz@icloud.com',
          phone: '',
          address: {
            city: 'st georgen',
            country: 'at',
            line1: 'dr greilstrasse 11',
            line2: '',
            postal_code: '4880'
          }
        }
      }
    });

    console.log(error, 'there is some stripe error');
    console.log(paymentIntent, 'this is the stripe payment ident');

    const client = useMedusaClient();
    const backendData = useBackendDataStore();

    if (!backendData.cart) {
      return;
    }

    await client.carts.complete(backendData.cart.id);
    console.log('payment done');
  };

</script>

<style scoped lang="scss">

</style>
