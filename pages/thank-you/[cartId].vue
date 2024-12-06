<template>
  <section class="flex items-start justify-center px-4 py-48">
    <div class="bg-white rounded-lg max-w-lg text-center p-8 pt-16">

      <!-- Title -->
      <h1 class="text-3xl font-bold mb-4">Danke für deine Anfrage!</h1>

      <!-- Message -->
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        Wir melden uns in kürze bei dir.
      </p>
      <!-- Button -->
      <NuxtLink to="/"
                class="btn btn-primary">
        Weiter einkaufen
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">

  import {useRoute} from "vue-router";
  import {useBackendDataStore} from "~/store/backendData";

  onMounted(() => {
    if (useRoute().params.cartId === localStorage.getItem('cart_id')) {
      useBackendDataStore().completeCart();
      localStorage.removeItem('cart_id');
    }
  });


</script>

<style scoped lang="scss">

</style>
