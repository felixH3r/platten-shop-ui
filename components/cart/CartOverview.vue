<template>
  <CartItem :key="cartItem.id" v-for="cartItem in useBackendDataStore().cart?.items" :cart-item="cartItem as LineItem"/>
</template>

<script setup lang="ts">
  import {useBackendDataStore} from "~/store/backendData";
  import {useMedusaClient} from "#imports";
  import {LineItem, StoreRegionsRes} from "@medusajs/medusa";
  import {useMainStore} from "~/store/mainStore";

  onMounted(async () => {
    await useBackendDataStore().createCart();
  });

  const client = useMedusaClient();
  const backendData = useBackendDataStore();
  const cart = backendData.cart!;
  const company = ref("");
  const first_name = ref("");
  const last_name = ref("");
  const address_1 = ref("");
  const city = ref("");
  const postal_code = ref("");
  const phone = ref("");

  const addShipmentData = async () => {
    const regions = await client.regions.list();
    console.log(regions, 'regions');
    if (!backendData.cart) {
      return;
    }
    await client.carts.update(backendData.cart.id, {region_id: regions.regions[0].id});
    await backendData.addShipmentData({
      company: company.value,
      first_name: first_name.value,
      last_name: last_name.value,
      address_1: address_1.value,
      address_2: "",
      city: city.value,
      country_code: "at",
      province: "",
      postal_code: postal_code.value,
      phone: phone.value,
    });
    console.log('added');
    if (!backendData.shipmentOptions) {
      return;
    }
    await client.carts.addShippingMethod(backendData.cart.id, {option_id: backendData.shipmentOptions.shipping_options[0].id!});
  };


</script>

<style scoped lang="scss">
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
  }
</style>
