<template>

</template>

<script setup lang="ts">

  import {useRoute} from "vue-router";

  onMounted(() => {
    if (useRoute().params.cartId === localStorage.getItem('cart_id')) {
      localStorage.removeItem('cart_id');
    }
    window.location.href = '/';
  });


</script>

<style scoped lang="scss">

</style>
