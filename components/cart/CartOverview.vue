<template>
  <div>{{ cart.subtotal }}</div>
  <div>{{ cart.total }}</div>
  <div>{{ cart.items }}</div>
</template>

<script setup lang="ts">
  import {useBackendDataStore} from "~/store/backendData";

  const backendData = useBackendDataStore();
  const cart = backendData.cart!;
</script>

<style scoped lang="scss">

</style>
