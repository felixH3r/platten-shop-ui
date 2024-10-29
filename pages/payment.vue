<template>
  <div class="pt-16 pb-60 px-5 min-h-screen bg-primary">
    <h1 class="text-3xl pb-5">Bezahlung:</h1>
    <!--    <PaymentOptions/>-->
    <!--    stripe payment element-->
    <div id="payment-element"
         class="mt-5"
    ></div>
    <h4 class="pt-8 pb-5">Rechnungsadresse:</h4>
    <InvoiceData class="w-full"/>
  </div>
  <PriceOverview class="bg-white shadow-lg"/>
  <CTAButton :content="'Bezahlen'" :is-loading="isLoading" class="fixed bottom-5 right-5" @click="processPayment()"/>
</template>

<script setup lang="ts">
  import InvoiceData from "~/components/check-out/InvoiceData.vue";
  import PaymentOptions from "~/components/check-out/PaymentOptions.vue";
  import PriceOverview from "~/components/cart/PriceOverview.vue";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import {loadStripe, StripePaymentElement} from "@stripe/stripe-js";
  import {useMedusaClient} from "#imports";
  import {useBackendDataStore} from "~/store/backendData";
  import {useMainStore} from "~/store/mainStore";
  import cart from "~/pages/cart.vue";
  import {navigateTo} from "#app";


  const paymentElement = ref(null as Nullable<StripePaymentElement>);
  const clientSecret = ref('');
  let stripe: any;
  let elements: any;
  const isLoading = ref(false);

  onMounted(async () => {
    await setUpStripe();
  });

  const setUpStripe = async () => {
    const config = useRuntimeConfig();
    if (!config.public.stripe_publishable_key) {
      console.log('no stripe key!!');
      return;
    }
    stripe = await loadStripe(config.public.stripe_publishable_key);
    if (!stripe) {
      console.warn('stripe is not available');
      return;
    }

    if (!useBackendDataStore().cart) {
      console.warn('no cart therefore no payment possible');
      return;
    }

    await useBackendDataStore().createPaymentSession();
    const isStripeAvailable = useBackendDataStore().getCart.payment_sessions?.some(
        (session: any) => (
            session.provider_id === 'stripe'
        )
    );
    if (!isStripeAvailable) {
      console.log('stripe is not available');
      return;
    }
    await useBackendDataStore().setPaymentSession('stripe');
    clientSecret.value = useBackendDataStore().getCart.payment_session?.data.client_secret as string;
    elements = stripe.elements({clientSecret: clientSecret.value});
    paymentElement.value = elements.create('payment');
    if (!paymentElement.value) {
      return;
    }
    paymentElement.value.mount('#payment-element');
  };

  const processPayment = async () => {
    isLoading.value = true;
    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      console.log('submitError');
      return;
    }
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret.value,
      confirmParams: {
        return_url: 'https://meine-holzplatte.at',
      },
      redirect: "if_required"
    });
    if (error) {
      console.log('there is some stripe error');
    }
    useBackendDataStore().completeCart();
    localStorage.removeItem('cart_id');
    console.log('payment done');
    isLoading.value = false;
    navigateTo('/');
  };
</script>

<style scoped lang="scss">

</style>
