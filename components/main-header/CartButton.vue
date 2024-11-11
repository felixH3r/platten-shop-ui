<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <span class="badge badge-sm indicator-item">{{ itemsQty }}</span>
      </div>
    </div>
    <div
        tabindex="0"
        class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
      <div class="card-body">
        <span class="text-lg font-bold">{{ itemsQty }} {{ TC.cart.items }}</span>
        <span class="">{{ TC.cart.sum }}: {{ total }}</span>
        <div class="card-actions">
          <NuxtLink :to="'/cart'" class="btn btn-primary btn-block">View cart</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import {useBackendDataStore} from "../../store/backendData";
  import {formatPrice} from "~/utils/helper";

  const backendDataStore = useBackendDataStore();

  const itemsQty = computed((): number => {
    if (!backendDataStore.cart || !backendDataStore.cart.items) {
      return 0;
    }
    console.log(backendDataStore.cart.items);
    return backendDataStore.cart.items.length;
  });

  const total = computed((): string => {
    if (!backendDataStore.cart || !backendDataStore.cart.total) {
      return '0,00';
    }
    return formatPrice(backendDataStore.cart.total);
  });
</script>

<style scoped lang="scss">

</style>
