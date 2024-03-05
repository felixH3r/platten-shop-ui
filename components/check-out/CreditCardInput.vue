<template>
  <div id="payment-element"></div>
  <!--  <div id="link-authentication-element"/>-->
  <button @click="processPayment">test bezahlung</button>
</template>

<script setup lang="ts">
  import Stripe, {loadStripe, StripePaymentElement} from "@stripe/stripe-js";
  import {useMedusaClient} from "#imports";
  import {useBackendDataStore} from "~/store/backendData";

  const stripe = ref(null as any);
  const paymentElement = ref(null as Nullable<StripePaymentElement>);
  const clientSecret = ref('');
  let elements: any;


  onMounted(async () => {
    await setUpStripe();
  });

  const setUpStripe = async () => {
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
    const thirdCart = await client.carts.update(backendData.cart.id, {email: 'felix.hermanutz@gmx.at'});
    const newCart = await client.carts.createPaymentSessions(backendData.cart.id);
    const isStripeAvailable = newCart.cart.payment_sessions?.some(
        (session) => (
            session.provider_id === "stripe"
        )
    );
    if (!isStripeAvailable) {
      return;
    }
    var secondCart = await client.carts.setPaymentSession(newCart.cart.id, {
      provider_id: "stripe"
    });
    clientSecret.value = secondCart.cart.payment_session?.data.client_secret as string;
    elements = stripe.value.elements({clientSecret: clientSecret.value});
    paymentElement.value = elements.create('payment');
    if (!paymentElement.value) {
      return;
    }
    paymentElement.value.mount('#payment-element');

    console.log(thirdCart, 'cart when init');
  };

  console.log(useBackendDataStore().cart, 'cart before stripe');

  const processPayment = async () => {
    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      alert('submitError');
      return;
    }
    const {error} = await stripe.value.confirmPayment({
      elements,
      clientSecret: clientSecret.value,
      confirmParams: {
        return_url: 'https://localhost:3000',
      },
      redirect: "if_required"
    });
    if (error) {
      alert('there is some stripe error');
    }
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   alert(error);
    // } else {
    //   alert("An unexpected error occured.");
    // }

    console.log(error, 'there is some stripe error');
    // console.log(paymentIntent, 'this is the stripe payment ident');

    const client = useMedusaClient();
    const backendData = useBackendDataStore();

    if (!backendData.cart) {
      return;
    }
    console.log(backendData.cart, 'cart');
    // await client.carts.complete(backendData.cart.id);
    localStorage.removeItem('cart_id');
    console.log('payment done');
  };

</script>

<style scoped lang="scss">

</style>
