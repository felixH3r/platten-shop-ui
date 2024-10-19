<template>
  <div class="flex justify-between items-start">
    <div class="flex gap-5">
      <NuxtImg :src="cartItem.thumbnail" format="webp"
               class="w-32 h-24 shadow-lg"/>
      <div class="flex flex-col justify-between">
        <div>
          <h5>{{ cartItem.title }}</h5>
          <span>{{ cartItem.variant.title }}</span>
        </div>
        <InputNumber :default-value="cartItem.quantity" :on-change="increaseQty"/>
      </div>
    </div>
    <button class="text-xl">X</button>
  </div>
  <div class="flex justify-between mt-3">
    <div class="flex gap-5">
      <div class="flex flex-col md:flex-row">
        <span class="pr-2">{{ TC.cart.length }}:</span>
        <span>{{ cartItem.metadata.length }}mm</span>
      </div>
      <div class="flex flex-col md:flex-row">
        <span class="pr-2">{{ TC.cart.width }}:</span>
        <span>{{ cartItem.metadata.width }}mm</span>
      </div>
    </div>
    <span class="self-end">€ {{ (cartItem.total / 100).toFixed(2) }}</span>
  </div>
  <hr class="h-px my-4 border-0 bg-primary-variant">
</template>

<script setup lang="ts">
  import InputNumber from "~/components/utils/InputNumber.vue";
  import {LineItem} from "@medusajs/medusa";
  import {useBackendDataStore} from "~/store/backendData";

  const props = defineProps<{
    cartItem: LineItem
  }>();

  const increaseQty = async (newVal: number) => {
    await useBackendDataStore().increaseItemQty(props.cartItem.id, newVal);
  };
</script>

<style scoped lang="scss">

</style>
